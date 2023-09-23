async function isWalletExists() {
  let args = new URLSearchParams({
    accountName: document.querySelector("#wallet-name").value,
  }).toString();

  return await fetch(buildURL("/user/account/check_wallet", args))
    .then((res) => res.json())
    .then((data) => {
      return data.walletExists;
    })
    .finally(() => closeModalWindow());
}

async function submitForm() {
  if ((await isWalletExists()) == false) {
    document.querySelector("#create-wallet-form").submit();
  }
}
