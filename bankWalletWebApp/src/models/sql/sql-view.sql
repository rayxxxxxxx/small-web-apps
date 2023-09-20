create view bank_app_view as
    select
        user.id as user_id,
        user.login,
        user.email,
        account.id as account_id,
        account.name as annount_name,
        wallet.id as wallet_id,
        wallet.name as wallet_name,
        wallet.fund
    from
        user left join account on user.id=account.user_id
            left join wallet on account.id=wallet.account_id;