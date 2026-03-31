"""In-memory TTL cache (replaces Redis for lightweight deployments)."""

import time
import logging
from typing import Any

from app.config import settings

logger = logging.getLogger(__name__)

_store: dict[str, tuple[float, Any]] = {}  # key → (expires_at, value)


async def cache_get(key: str) -> dict | None:
    entry = _store.get(key)
    if entry is None:
        return None
    expires_at, value = entry
    if time.monotonic() > expires_at:
        _store.pop(key, None)
        return None
    return value


async def cache_set(key: str, value: dict, ttl: int | None = None) -> None:
    _store[key] = (time.monotonic() + (ttl or settings.CACHE_TTL), value)


async def cache_delete_pattern(pattern: str) -> None:
    """Delete keys matching a simple prefix pattern like 'cars:*'."""
    prefix = pattern.rstrip("*")
    keys_to_delete = [k for k in _store if k.startswith(prefix)]
    for k in keys_to_delete:
        _store.pop(k, None)


async def cache_clear() -> None:
    _store.clear()
