"""Add Completed Column

Revision ID: b5367c189b12
Revises: 3cbb18116ced
Create Date: 2020-11-10 08:21:45.378085

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'b5367c189b12'
down_revision = '3cbb18116ced'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todos', sa.Column('completed', sa.Boolean(), nullable=True))
    # Execute Insert for old column
    op.execute('UPDATE todos SET completed = False WHERE completeda IS NULL;')
    op.alter_column('todos', 'completed', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('todos', 'completed')
    # ### end Alembic commands ###