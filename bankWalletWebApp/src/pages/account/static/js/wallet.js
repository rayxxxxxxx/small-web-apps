function copyWalletId(event) {
  walletId =
    event.target.parentElement.querySelector(".wallet-row-id").innerText;
  navigator.clipboard.writeText(walletId);
}
