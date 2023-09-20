from flask import Blueprint
from flask import request, make_response, url_for
from flask import render_template, redirect
from flask import jsonify

from models.sql.sql_orm import sqldb
from models.sql.wallet_model import Wallet

wallet = Blueprint('wallet', __name__, static_folder='../pages/wallet/static',
                   static_url_path='/static', template_folder='../pages/wallet/templates', url_prefix='/wallet')


@wallet.get('/')
def get():
    wallet_id = request.args.get(
        'wallet_id') or request.cookies.get('wallet_id')
    return render_template('wallet.html', wallet=Wallet.query.get(wallet_id))


@wallet.post('/transaction')
def transaction():
    request_wallet_id = request.form.get('user_wallet_id')
    amount = request.form.get('amount')

    request_wallet = Wallet.query.get(request_wallet_id)
    current_wallet = Wallet.query.get(request.cookies.get('wallet_id'))

    current_wallet.fund -= int(amount)
    request_wallet.fund += int(amount)

    sqldb.session.commit()

    return render_template('wallet.html', wallet=Wallet.query.get(request.cookies.get('wallet_id')))


@wallet.get('/check_transaction')
def check_transaction():
    wallet_id = request.args.get('walletId')
    amount = request.args.get('amount')

    request_wallet = Wallet.query.get(wallet_id)
    current_wallet = Wallet.query.get(request.cookies.get('wallet_id'))

    if request_wallet and int(current_wallet.fund) >= int(amount):
        return jsonify({'transactionIsValid': True})

    return jsonify({'transactionIsValid': False})
