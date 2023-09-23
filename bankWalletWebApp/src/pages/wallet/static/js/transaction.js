async function checkTransaction() {
  let args = new URLSearchParams({
    walletId: document.querySelector("#user-wallet-id").value,
    amount: document.querySelector("#amount").value,
  }).toString();

  return await fetch(buildURL("/user/account/wallet/check_transaction", args))
    .then((res) => res.json())
    .then((data) => {
      return data.transactionIsValid;
    })
    .finally(() => closeModalWindow());
}

async function submitForm() {
  if ((await checkTransaction()) == true) {
    document.querySelector("#transaction-form").submit();
  } else {
    alert(
      `Wallet with id ${
        document.querySelector("#user-wallet-id").value
      } doesn't exists or you don't have enough money...`
    );
  }
}
