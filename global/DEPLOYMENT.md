# DEPLOYMENT.md — Deployment Standards & CI/CD

---

## Environment tiers

| Environment | Branch | Stability | Auto-deploy | Approval |
|---|---|---|---|---|
| DEV | `dev` | Unstable | On merge to `dev` | None |
| STAGING | Release branches | Stable | Manual | QA team |
| PRODUCTION | `main` | Highly stable | Manual gate | CTO / Lead |

---

## CI/CD — GitHub Actions

### Dev pipeline (triggered on merge to `dev`)
1. Checkout code
2. Install dependencies
3. Run linters (ESLint, Prettier)
4. Run tests (unit + integration)
5. Build / compile
6. Build Docker image — tag: `service-name:dev-<short-commit-hash>`
7. Push image to Azure Container Registry (ACR)
8. Deploy to Dev environment
9. Health check verification

### Production pipeline (triggered on merge to `main`)
1–6. Same as dev pipeline
7. Tag: `service-name:prod-<version>`
8. Push to ACR
9. **Manual approval gate** required
10. Deploy to Production
11. Run smoke tests
12. Post-deployment verification
13. Monitor logs and metrics

### Required checks before any merge
- Unit tests pass (minimum 80% coverage)
- Integration tests pass
- Security scanning passes
- Code review approved
- Branch up-to-date with base

---

## Docker standards

- All services must be containerised.
- Use multi-stage builds to minimise image size.
- Use official base images from Docker Hub.
- Never include secrets in Dockerfile or image layers.
- Use `.dockerignore` to exclude unnecessary files.
- Run containers as non-root user where possible.

Image naming: `<service-name>:<environment>-<version>`
Examples: `twynity-marketplace:dev-abc123`, `twynity-marketplace:prod-v1.2.3`

---

## Azure deployment targets

| Service | Use case |
|---|---|
| Azure Container Apps | Microservices, event-driven apps, modern architecture (preferred) |
| Azure App Service for Containers | Web apps and REST APIs with built-in scaling |
| Azure Container Instances (ACI) | Lightweight stateless apps, batch jobs |
| Azure VMs + Docker | Custom infrastructure, legacy requirements |

For the Twynity Marketplace frontend, use **Azure App Service for Containers** or **Azure Container Apps**.

---

## Secrets management

- Development: GitHub Secrets
- Production: Azure Key Vault
- Never commit secrets to the repository
- Never hardcode credentials in code or Dockerfile
- Rotate API keys every 90 days

---

## Pre-deployment checklist

Infrastructure: all services containerised, images in ACR, resource group created, correct Azure region confirmed.

Database: provisioned and running, connection strings configured, backup strategy in place.

Networking: port mappings documented, SSL/TLS certificates obtained, firewall rules configured.

Configuration: all environment variables documented, secrets in Azure Key Vault, GitHub Secrets configured.

Monitoring: Azure Monitor configured, Application Insights enabled, alerts set up, log aggregation active.

---

## Rollback procedure

1. Redeploy the previous Docker image tag from ACR.
2. Run health checks.
3. Verify application functionality.
4. Review deployment logs to identify root cause.
5. Fix, test in dev, then redeploy through the standard pipeline.
