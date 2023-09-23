import uuid
import hashlib

from flask import Flask

import config

from routes.home import home as home_blueprint
from routes.auth.login import login as login_blueprint
from routes.auth.signup import signup as signup_blueprint
from routes.user import user as user_blueprint

from routes.auth.login import login_manager

from models.sql.sql_orm import sqldb
from models.sql.user_model import User
from models.sql.account_model import Account
from models.sql.wallet_model import Wallet


def main():
    app = Flask(__name__)

    app.register_blueprint(login_blueprint)
    app.register_blueprint(signup_blueprint)
    app.register_blueprint(home_blueprint)
    app.register_blueprint(user_blueprint)

    app.config['SECRET_KEY'] = hashlib.sha256(
        bytes(uuid.uuid4().hex.encode('utf-8'))).hexdigest()
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{config.DB_USER}:{config.DB_PASSWORD}@{config.DB_HOST}/{config.DB_NAME}'

    sqldb.init_app(app=app)
    with app.app_context():
        sqldb.create_all()

    login_manager.init_app(app=app)

    app.run(host=config.HOST, port=config.PORT, debug=True)


if __name__ == '__main__':
    main()
