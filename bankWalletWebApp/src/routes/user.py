from flask import Blueprint
from flask import request, make_response, url_for
from flask import render_template, redirect
from flask import jsonify
from flask_login import login_required, logout_user, current_user

from models.sql.sql_orm import sqldb
from models.sql.account_model import Account

from routes.account import account as account_blueprint

user = Blueprint('user', __name__, static_folder='../pages/user/static',
                 static_url_path='/static', template_folder='../pages/user/templates', url_prefix='/user')
user.register_blueprint(account_blueprint)


@user.get('/')
@login_required
def get():
    accounts = Account.query.filter_by(user_id=current_user.id).all()
    return render_template('user.html', accounts=accounts)


@user.get('/open_account')
def open_account():
    account_id = request.args.get('account_id')
    response = make_response(
        redirect(url_for('user.account.get', account_id=account_id)))
    response.set_cookie('account_id', account_id)
    return response


@user.post('/create_account')
def create_account():
    account_name = request.form.get('account_name')

    new_account = Account(current_user.id, account_name)
    sqldb.session.add(new_account)
    sqldb.session.commit()

    return redirect(url_for('user.get'))


@user.get('/delete_account')
def delete_account():
    # TODO implement delete account function
    ...


@user.get('/check_account')
def check_account():
    return jsonify({'accountExists': Account.query.filter_by(name=request.args.get('accountName')).first() != None})


@user.get('/logout')
def logout():
    logout_user()
    return redirect(url_for('home.main'))
