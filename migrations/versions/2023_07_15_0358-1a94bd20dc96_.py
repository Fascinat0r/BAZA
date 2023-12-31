"""empty message

Revision ID: 1a94bd20dc96
Revises: 
Create Date: 2023-07-15 03:58:59.800622

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a94bd20dc96'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('component',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.TIMESTAMP(), nullable=True),
    sa.Column('data', sa.JSON(), nullable=False),
    sa.Column('is_final', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('material',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('manufacturer', sa.String(), nullable=True),
    sa.Column('data', sa.JSON(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('role',
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('permissions', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('role_id')
    )
    op.create_table('component_association',
    sa.Column('parent_id', sa.Integer(), nullable=False),
    sa.Column('child_id', sa.Integer(), nullable=False),
    sa.Column('postfix', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['child_id'], ['component.id'], ),
    sa.ForeignKeyConstraint(['parent_id'], ['component.id'], ),
    sa.PrimaryKeyConstraint('parent_id', 'child_id')
    )
    op.create_table('material_association',
    sa.Column('component_id', sa.Integer(), nullable=False),
    sa.Column('material_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['component_id'], ['component.id'], ),
    sa.ForeignKeyConstraint(['material_id'], ['material.id'], ),
    sa.PrimaryKeyConstraint('component_id', 'material_id')
    )
    op.create_table('system',
    sa.Column('parent_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['component.id'], ),
    sa.PrimaryKeyConstraint('parent_id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('registered_at', sa.TIMESTAMP(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('hashed_password', sa.String(length=1024), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['role.role_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('system')
    op.drop_table('material_association')
    op.drop_table('component_association')
    op.drop_table('role')
    op.drop_table('material')
    op.drop_table('component')
    # ### end Alembic commands ###
