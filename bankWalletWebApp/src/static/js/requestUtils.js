const urlbegin = "http://localhost:5000";

function buildURL(path, args) {
  return urlbegin + path + "?" + args;
}
