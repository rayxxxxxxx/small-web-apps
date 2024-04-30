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
from app.models.user import User as UserModel
from .schemas import LoginSchema, SignUpSchema

router = Blueprint('auth', __name__, url_prefix='/auth')


@router.get('/login')
def login_page():
    return render_template('login.html')


@router.post('/login')
def login():
    creds = LoginSchema(**request.form.to_dict())
    creds.hash_password()

    user = UserModel.verify(creds.email, creds.password)

    if user:
        payload = {'user_id': user.id}
        token = pyjwt.encode(payload, Config.SECRET)

        response = make_response(redirect(url_for('profile.index')))
        response.set_cookie('token', token)
        response.set_cookie('user_name', user.user_name)

        return response

    return redirect(url_for('auth.login'))


@router.get('/signup')
def signup_page():
    return render_template('signup.html')


@router.post('/signup')
def signup():
    creds = SignUpSchema(**request.form.to_dict())
    creds.hash_password()

    user = UserModel.exists(creds.email, creds.user_name)

    if not user:
        user.generate_id()
        user.save(force_insert=True)
        return redirect(url_for('auth.login'))

    return redirect(url_for('auth.signup'))


@router.get('/logout')
def logout():
    response = make_response(render_template('login.html'))
    response.delete_cookie('token')
    return response
