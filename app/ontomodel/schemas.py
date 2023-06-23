from datetime import datetime

from pydantic import BaseModel


class componentCreate(BaseModel):
    id: int
    name: str
    description: str
    creator_id: int
    date: datetime
