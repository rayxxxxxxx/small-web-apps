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

router = Blueprint('profile', __name__, url_prefix='/profile')


@router.get('/')
def index():
    token = request.cookies.get('token')
    if not token:
        return redirect(url_for('auth.login'))

    try:
        pyjwt.decode(
            token,
            Config.SECRET,
            algorithms=['HS256']
        )
    except pyjwt.InvalidSignatureError:
        return redirect(url_for('auth.login'))

    return render_template(
        'profile.html',
        username=request.cookies.get('user_name')
    )
