import uuid
import hashlib

from peewee import Model, TextField

from app.database import db


class User(Model):
    id = TextField(column_name='id')
    username = TextField(column_name='username')
    password = TextField(column_name='password')

    class Meta:
        table_name = 'User'
        database = db


def create_user(username, password):
    psswdhash = hashlib.md5(password.encode('utf8')).hexdigest()
    User.create(
        id=uuid.uuid4().hex,
        username=username,
        password=psswdhash
    )


def user_exists(username):
    return User.select().where(
        User.username == username
    ).exists()


def verify_password(username, password):
    psswdhash = hashlib.md5(password.encode('utf8')).hexdigest()
    return User.select().where(
        User.username == username and
        User.password == psswdhash
    ).exists()
