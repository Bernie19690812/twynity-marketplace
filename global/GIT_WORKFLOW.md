# GIT_WORKFLOW.md — Git Branching & Workflow Standards

---

## Protected branches

| Branch | Purpose | Deploy target | Approval required |
|---|---|---|---|
| `main` | Production-ready code | Production | CTO / Lead |
| `dev` | Integration / staging | Dev environment | Peer review |

No direct commits to either branch. All changes go through Pull Requests. No force pushes.

---

## Branch naming

```
feature/PROJ-123-brief-description
bugfix/PROJ-456-fix-login-timeout
hotfix/PROJ-789-critical-security-patch
release/v1.2.0
```

Rules: lowercase, kebab-case, include ticket number, branch from `dev` (except hotfixes which branch from `main`).

---

## Commit message format

```
<type>(<scope>): <description>

[optional body]
[optional footer — Closes #123]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(onboarding): add chat-based twin creation flow
fix(marketplace): handle empty category state
refactor(auth): simplify token refresh logic
```

Rules: present tense, first line under 72 characters, reference issues in footer.

---

## Pull request requirements

Before opening a PR confirm:
- Unit tests pass (minimum 80% coverage)
- Integration tests pass
- Linting passes
- No hardcoded secrets or credentials
- All review comments from previous PRs addressed

PR title format: `[Feature] Brief description` or `[Fix] Brief description`

---

## Merge strategy

- Use **Squash and merge** to `dev` for clean history.
- Use **Create a merge commit** for releases to `main`.
- Never use rebase and merge on `dev`.

---

## Pre-commit hooks (TypeScript projects)

Tools: Husky + lint-staged + ESLint + Prettier

What runs automatically on commit:
1. Prettier formatting
2. ESLint linting
3. TypeScript type checking
4. Unit tests

All must pass before the commit is accepted.

---

## Release to production

1. Create PR from `dev` → `main`, titled `Release v[version]`
2. Include release notes listing all changes
3. CTO or Lead must approve
4. All tests and security scans must pass
5. After merge, tag the release: `git tag -a v1.2.3 -m "Release 1.2.3"`
6. Update `CHANGELOG.md`

---

## Hotfix workflow

For critical production issues only:
1. Branch from `main`: `hotfix/PROJ-999-description`
2. Make the minimal fix only
3. PR to `main` — mark URGENT, request immediate review
4. After merge to `main`, also merge into `dev`
