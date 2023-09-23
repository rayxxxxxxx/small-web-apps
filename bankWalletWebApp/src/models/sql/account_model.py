import uuid

from models.sql.sql_orm import sqldb


class Account(sqldb.Model):
    id = sqldb.Column('id', sqldb.String(255), primary_key=True)
    user_id = sqldb.Column('user_id', sqldb.String(255),
                           sqldb.ForeignKey('user.id'))
    name = sqldb.Column('name', sqldb.String(
        100), unique=True, default='account-1', nullable=False)

    def __init__(self, user_id: str, name: str) -> None:
        super().__init__()
        self.id = uuid.uuid4()
        self.user_id = user_id
        self.name = name
