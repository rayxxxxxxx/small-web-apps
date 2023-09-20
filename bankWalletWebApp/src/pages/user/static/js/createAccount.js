async function isAccountExists() {
  let args = new URLSearchParams({
    accountName: document.querySelector("#account-name").value,
  }).toString();

  return await fetch(buildURL("/user/check_account", args))
    .then((res) => res.json())
    .then((data) => {
      return data.accountExists;
    })
    .finally(() => closeModalWindow());
}

async function submitForm() {
  if ((await isAccountExists()) == false) {
    document.querySelector("#create-account-form").submit();
  }
}
