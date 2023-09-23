import uuid

from flask_login import UserMixin

from models.sql.sql_orm import sqldb


class User(UserMixin, sqldb.Model):
    id = sqldb.Column('id', sqldb.String(255), primary_key=True)
    email = sqldb.Column('email', sqldb.String(50), unique=True)
    login = sqldb.Column('login', sqldb.String(50), unique=True)
    password = sqldb.Column('password', sqldb.String(255))

    def __init__(self, email: str, login: str, password: str) -> None:
        super().__init__()
        self.id = uuid.uuid4()
        self.email = email
        self.login = login
        self.password = password
