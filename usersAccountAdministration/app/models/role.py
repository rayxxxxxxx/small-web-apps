from peewee import (
    Model,
    IntegerField,
    TextField
)

from app.database import db


class Role(Model):
    id = IntegerField(primary_key=True)
    name = TextField()

    class Meta:
        database = db
        db_table = 'Role'
