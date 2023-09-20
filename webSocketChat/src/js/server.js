require("dotenv").config();
const WebSocket = require("ws");
const http = require("http");

server = new http.createServer();

wss = new WebSocket.Server({ server });
wss.on("connection", (socket) => onConnect(socket));

server.listen(process.env.PORT, process.env.HOST);

function onConnect(clientSocket) {
  console.log("new client");
  clientSocket.on("close", (wss) => onClose(wss));
  clientSocket.on("message", (msg) => onMessage(wss, clientSocket, msg));

  SendAll({
    responce: `<span class="chat-item-label">server</span>: <span class="server-answer joined">new user has joined...</span>`,
  });
}

function onClose(wss) {
  responce = {
    responce: `<span class="chat-item-label">server</span>: <span class="server-answer disconnected">user has disconnected...</span>`,
  };
  SendAll(responce);
}

function onMessage(wss, client, message) {
  body = JSON.parse(message);

  let date = new Date();
  date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  responce = {
    responce: `<span class="chat-item-label">${body.user_name}</span> <span class="chat-item-date">${date}</span>: <span class="chat-item-data">${body.user_data}</span>`,
  };

  SendAll(responce);
}

function stopHttpServer() {
  server.close();
}

function SendAll(data) {
  wss.clients.forEach((c) => {
    if (c && c.readyState == WebSocket.OPEN) {
      c.send(JSON.stringify(data));
    }
  });
}
