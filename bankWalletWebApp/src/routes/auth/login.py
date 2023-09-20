import hashlib

from flask import Blueprint, render_template, make_response, redirect, url_for, request
from flask_login import LoginManager, login_user


from models.sql.sql_orm import sqldb
from models.sql.user_model import User

login = Blueprint('login', __name__, static_folder='../../pages/authentication/static',
                  static_url_path='/authentication/static', template_folder='../../pages/authentication/templates', url_prefix='/login')

login_manager = LoginManager()
login_manager.login_view = 'login.main'


@login.get('/')
def main():
    return render_template('login.html')


@login.post('/')
def sign_in():
    login = request.form.get('login')
    password = request.form.get('password')

    user = User.query.filter_by(login=login).first()
    if not user or not check_password(user.password, password):
        return render_template('login.html')

    login_user(user, remember='remember')

    response = make_response(redirect(url_for('user.get')))
    response.set_cookie('user_id', user.id)

    return response


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login.main'))


def check_password(user_password, password: str):
    return user_password == hashlib.sha256(bytes(password.encode('utf-8'))).hexdigest()
