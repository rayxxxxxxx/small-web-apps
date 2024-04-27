from flask import (
    Blueprint,
    make_response,
    redirect,
    url_for,
    render_template,
    request
)

import jwt as pyjwt

from config import Config
from .schemas import User as UserSchema
from .models import (
    user_exists,
    verify_password,
    create_user
)

router = Blueprint('auth', __name__, url_prefix='/auth')


@router.get('/login')
def login_page():
    return render_template('login.html')


@router.post('/login')
def login():
    user = UserSchema(**request.form.to_dict())

    if verify_password(user.username, user.password):
        payload = {'username': user.username}
        token = pyjwt.encode(payload, Config.SECRET)

        page = render_template('login.html')

        response = make_response(page)
        response.set_cookie('token', token)
        response.set_cookie('username', user.username)

        return response

    return redirect(url_for('auth.login'))


@router.get('/signup')
def signup_page():
    return render_template('signup.html')


@router.post('/signup')
def signup():
    user = UserSchema(**request.form.to_dict())

    if not user_exists(user.username):
        create_user(user.username, user.password)
        return redirect(url_for('auth.login'))

    return redirect(url_for('auth.signup'))


@router.get('/logout')
def logout():
    response = make_response(render_template('login.html'))
    response.delete_cookie('token')
    return response
