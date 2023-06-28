"""Add manufacturer to material

Revision ID: efb10c2970ef
Revises: da3014400924
Create Date: 2023-06-28 00:56:19.680803

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'efb10c2970ef'
down_revision = 'da3014400924'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('material', sa.Column('manufacturer', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('material', 'manufacturer')
    # ### end Alembic commands ###