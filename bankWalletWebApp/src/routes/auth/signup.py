import hashlib

from flask import Blueprint, render_template, redirect, url_for, request, jsonify

from models.sql.sql_orm import sqldb
from models.sql.user_model import User

signup = Blueprint('signup', __name__, static_folder='../../pages/authentication/static',
                   static_url_path='/authentication/static', template_folder='../../pages/authentication/templates', url_prefix='/signup')


@signup.get('/')
def main():
    return render_template('signup.html')


@signup.post('/')
def register_user():

    email = request.form.get('email')
    login = request.form.get('login')
    password = request.form.get('password')

    sqldb.session.add(User(email, login, hash_password(password)))
    sqldb.session.commit()

    return redirect(url_for('login.main'))


@signup.get('/check')
def check_user():
    response = jsonify({'userExists': User.query.filter_by(
        email=request.args.get('email')).first() != None})
    return response


def hash_password(password: str):
    return hashlib.sha256(bytes(password.encode('utf-8'))).hexdigest()
