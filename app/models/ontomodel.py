from sqlalchemy import Integer, String, TIMESTAMP, JSON
from sqlalchemy.orm import mapped_column

from app.models import Base


# component = Table(
#     "component",
#     base.metadata,
#     Column("id", Integer, primary_key=True),
#     Column("name", String, nullable=False),
#     Column("description", String),
#     Column("creator_id", Integer),
#     Column("date", TIMESTAMP)
# )


class Component(Base):
    __tablename__ = 'component'

    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String, nullable=False)
    description = mapped_column(String)
    creator_id = mapped_column(Integer)
    date = mapped_column(TIMESTAMP)
    data = mapped_column(JSON)


component = Component.__tablename__
