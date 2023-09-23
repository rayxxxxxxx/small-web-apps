async function checkUser() {
  let queryArgs = new URLSearchParams({
    email: document.querySelector("#signup-email").value,
  }).toString();

  let url = buildURL("/signup/check", queryArgs);
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.userExists;
    });
}

async function submitForm() {
  if ((await checkUser()) == false) {
    document.querySelector("#signup-form").submit();
  }
}
