import uuid

from models.sql.sql_orm import sqldb


class Wallet(sqldb.Model):
    id = sqldb.Column('id', sqldb.String(255), primary_key=True)
    account_id = sqldb.Column('account_id', sqldb.String(255),
                              sqldb.ForeignKey('account.id'))
    name = sqldb.Column('name', sqldb.String(
        100), unique=True, default='account-1', nullable=False)
    fund = sqldb.Column('fund', sqldb.Integer, nullable=False, default=0)

    def __init__(self, account_id: str, name: str) -> None:
        super().__init__()
        self.id = uuid.uuid4()
        self.account_id = account_id
        self.name = name
        self.fund = 0
