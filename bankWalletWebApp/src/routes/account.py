from flask import Blueprint
from flask import request, make_response, url_for
from flask import render_template, redirect
from flask_login import current_user
from flask import jsonify

from models.sql.sql_orm import sqldb
from models.sql.wallet_model import Wallet

from routes.wallet import wallet as wallet_blueprint

account = Blueprint('account', __name__, static_folder='../pages/account/static',
                    static_url_path='/static', template_folder='../pages/account/templates', url_prefix='/account')
account.register_blueprint(wallet_blueprint)


@account.get('/')
def get():
    account_id = request.args.get(
        'account_id') or request.cookies.get('account_id')
    wallets = Wallet.query.filter_by(account_id=account_id).all()
    return render_template('account.html', wallets=wallets)


@account.get('open_wallet')
def open_wallet():
    wallet_id = request.args.get('walletId')
    response = make_response(
        redirect(url_for('user.account.wallet.get', wallet_id=wallet_id)))
    response.set_cookie('wallet_id', wallet_id)
    return response


@account.post('/create_wallet')
def create_wallet():
    wallet_name = request.form.get('wallet_name')

    new_account = Wallet(request.cookies.get('account_id'), wallet_name)
    sqldb.session.add(new_account)
    sqldb.session.commit()

    return redirect(url_for('user.account.get', account_id=request.cookies.get('account_id')))


@account.get('/delete_wallet')
def delete_wallet():
    # TODO implement delete wallet function
    ...


@account.get('/check_wallet')
def check_wallet():
    return jsonify({'walletExists': Wallet.query.filter_by(name=request.args.get('walletName')).first() != None})
