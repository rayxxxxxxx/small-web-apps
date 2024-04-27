from datetime import datetime

from pydantic import BaseModel


class Post(BaseModel):
    date: datetime
    tags: str
    text: str
