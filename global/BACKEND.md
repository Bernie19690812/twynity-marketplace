# BACKEND.md — Backend Implementation Patterns

Stack: Python + FastAPI + PostgreSQL + MongoDB + Docker

---

## Async-first patterns

FastAPI is async-first. All I/O-bound operations must use `async/await`.

```python
# Good — async for I/O
@app.get("/twins/{twin_id}")
async def get_twin(twin_id: str):
    twin = await database.fetch_twin(twin_id)
    return twin

# Bad — blocking sync call in async function
@app.get("/twins")
async def get_twins():
    twins = expensive_sync_function()  # blocks event loop
    return twins

# Fix — use run_in_executor for CPU-bound work
import asyncio
from concurrent.futures import ThreadPoolExecutor

@app.get("/compute")
async def compute():
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(ThreadPoolExecutor(), cpu_intensive_fn)
    return result
```

---

## API design

- FastAPI auto-generates OpenAPI docs at `/docs` — keep all endpoints documented.
- Use Pydantic models for all request and response validation.
- Version all APIs in the URL: `/api/v1/`
- Use appropriate HTTP status codes (see `API_STANDARDS.md`).
- Never expose stack traces to clients.

```python
from pydantic import BaseModel, validator

class TwinCreate(BaseModel):
    twin_name: str
    use_case: str
    tone: str
    consent: bool

    @validator('twin_name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('twin_name cannot be empty')
        return v

@app.post("/api/v1/twins", response_model=TwinResponse, status_code=201)
async def create_twin(twin: TwinCreate):
    return await db.create_twin(twin)
```

---

## Authentication

```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401)
        return user_id
    except JWTError:
        raise HTTPException(status_code=401)
```

Secrets are stored in Azure Key Vault. Never hardcode credentials.

---

## Data modeling

**PostgreSQL (relational):** Use Alembic for all schema migrations. Never modify schema manually in production. Index frequently queried fields. Use transactions for multi-step operations.

**MongoDB (document):** Use for flexible or nested data structures. Create indexes on frequently queried fields. Use schema validation for critical fields.

---

## Testing

Unit tests for core logic, integration tests for API + DB. Minimum 80% coverage required before merging.

```python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_twin():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/twins", json={
            "twin_name": "Alex",
            "use_case": "customer support",
            "tone": "professional",
            "consent": True
        })
    assert response.status_code == 201
```

---

## Health checks

Every service must expose:
```python
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/ready")
async def readiness_check():
    try:
        await database.execute("SELECT 1")
        return {"status": "ready"}
    except Exception:
        raise HTTPException(status_code=503)
```

---

## Structured logging

```python
import logging

logger = logging.getLogger(__name__)

@app.post("/api/v1/twins")
async def create_twin(twin: TwinCreate):
    logger.info("Twin creation initiated", extra={"twin_name": twin.twin_name})
    try:
        result = await db.create_twin(twin)
        logger.info("Twin created", extra={"twin_id": result.id})
        return result
    except Exception as e:
        logger.error("Twin creation failed", extra={"error": str(e)})
        raise
```
