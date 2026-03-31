"""001 — create cars table

Revision ID: 001_initial
Revises: None
Create Date: 2025-01-01 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "cars",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("manufacturer", sa.String(128), nullable=False, server_default=""),
        sa.Column("model", sa.String(128), nullable=False, server_default=""),
        sa.Column("badge", sa.String(128), nullable=False, server_default=""),
        sa.Column("badge_detail", sa.String(256), nullable=False, server_default=""),
        sa.Column("year", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("mileage", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("price", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("fuel", sa.String(64), nullable=False, server_default=""),
        sa.Column("transmission", sa.String(64), nullable=False, server_default=""),
        sa.Column("photo", sa.Text(), nullable=True),
        sa.Column("url", sa.Text(), nullable=False, server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_cars_id", "cars", ["id"])
    op.create_index("ix_cars_manufacturer", "cars", ["manufacturer"])
    op.create_index("ix_cars_model", "cars", ["model"])
    op.create_index("ix_cars_year", "cars", ["year"])
    op.create_index("ix_cars_price", "cars", ["price"])


def downgrade() -> None:
    op.drop_index("ix_cars_price")
    op.drop_index("ix_cars_year")
    op.drop_index("ix_cars_model")
    op.drop_index("ix_cars_manufacturer")
    op.drop_index("ix_cars_id")
    op.drop_table("cars")
