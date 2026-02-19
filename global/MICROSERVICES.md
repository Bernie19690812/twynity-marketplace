# MICROSERVICES.md — Twynity Platform Microservices

Two core microservices support the Twynity Marketplace frontend.

---

## 1. File Management System (FMS)

**Purpose:** Handles structured file metadata, raw file blobs, and vector-based indexing for semantic search and AI-driven retrieval.

**Stack:** Python + FastAPI + FastAPI MCP + MongoDB + Azure Blob / GridFS / Local FS

**Base URL:** Configured via `NEXT_PUBLIC_FMS_URL`

### What it stores
- File metadata: file_id, user_id, file_collection, file_name, group, mime_type, require_auth, index_chunk_ids, size, storage_location
- Raw binary blobs (Azure Blob in production, GridFS or local FS in dev)
- Vector index chunks (processed by Language Model Service)

### Supported blob storage backends
| Backend | Environment |
|---|---|
| Azure Blob Storage | Production |
| MongoDB GridFS | Staging / database-managed |
| Local File System | Development |

### Key capabilities
- File upload and download (with range requests and secure URLs)
- Semantic vector search over indexed content (PDF, XLSX, PPTX, DOCX)
- MCP interface for AI agent access

### Auth
JWT bearer tokens and Client Credentials JWT.

---

## 2. Platform Integration Service (PIS)

**Purpose:** Centralised secrets and integration registry. Stores, encrypts, and serves third-party platform credentials for MCP servers and internal microservices.

**Stack:** Python + FastAPI + MongoDB + Fernet encryption (AES-128 + HMAC)

**Base URL:** Configured via `NEXT_PUBLIC_PIS_URL`

### What it stores (all encrypted at rest where sensitive)
| Integration | Details |
|---|---|
| Microsoft Graph API | OAuth tokens for Outlook, SharePoint, OneDrive, Calendar |
| Microsoft DevOps | Tokens for pipelines, repos, Azure Boards |
| Google API | Tokens for Drive, Gmail, Calendar, Sheets |
| Power Automate | Webhook URLs for flow triggers |
| Service Keys | External SaaS API keys, agent auth secrets |
| MongoDB connections | Encrypted connection URL, username, password |
| Supabase connections | Encrypted connection URL, username, password |

### Access control
- **Service-to-service:** Client Credentials tokens; services can view/create tokens for users via `owner-id` header.
- **User access:** Users may access their own stored credentials and tokens.

### Security
- All sensitive fields encrypted at rest using Fernet (AES-128).
- Decryption performed only on explicit request — never stored decrypted.

---

## Frontend integration notes

- The Marketplace frontend does **not** call FMS or PIS directly in MVP.
- FMS is used by backend services to store knowledge sources uploaded during Twin onboarding.
- PIS is used by backend services to retrieve credentials for third-party integrations.
- If direct frontend access is needed in future, use the `NEXT_PUBLIC_FMS_URL` / `NEXT_PUBLIC_PIS_URL` env vars and the standard Axios instance from `lib/api.ts`.
