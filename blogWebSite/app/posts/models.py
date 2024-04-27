from peewee import (
    Model,
    TextField,
    DateTimeField,
    ForeignKeyField
)

from app.database import db
from app.auth.models import User


class Post(Model):
    id = TextField(column_name='id', primary_key=True)
    user = ForeignKeyField(User, backref='posts')
    date = DateTimeField(column_name='date')
    tags = TextField(column_name='tags')
    text = TextField(column_name='text')

    class Meta:
        database = db
        table_name = 'Post'

    @staticmethod
    def as_dict(post):
        return {
            'id': post.id,
            'user': User.as_dict(post.user),
            'date': post.date,
            'tags': post.tags,
            'text': post.text
        }
