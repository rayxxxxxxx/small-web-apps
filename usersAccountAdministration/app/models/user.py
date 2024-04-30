import uuid

from peewee import (
    Model,
    ForeignKeyField,
    TextField
)

from app.database import db
from app.models.role import Role


class User(Model):
    id = TextField(primary_key=True)
    role_id = ForeignKeyField(model=Role, backref='users')
    email = TextField()
    user_name = TextField()
    password = TextField()

    class Meta:
        database = db
        db_table = 'User'

    def generate_id(self):
        self.id = uuid.uuid4().hex

    @staticmethod
    def verify(email, password):
        return User.select().where(
            User.email == email and
            User.password == password
        ).get()

    @staticmethod
    def exists(email, user_name):
        return User.select().where(
            User.email == email or
            User.user_name == user_name
        ).get()
