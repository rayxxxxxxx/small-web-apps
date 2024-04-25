import peewee

from config import Config

db = peewee.SqliteDatabase(Config.DB_PATH)
db.connect()
