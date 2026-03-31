"""Application settings loaded from environment variables."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # SQLite (file inside /data volume or local dir)
    DATABASE_URL: str = "sqlite+aiosqlite:///./data/encar.db"

    # In-memory cache TTL
    CACHE_TTL: int = 3600  # seconds

    # Scraper
    SCRAPE_PAGE_SIZE: int = 200
    SCRAPE_MAX_PAGES: int = 5
    SCRAPE_INTERVAL_HOURS: int = 24

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost"]

    class Config:
        env_file = ".env"


settings = Settings()
