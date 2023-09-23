let client = null;
let connected = false;

class Client {
  constructor(name) {
    this.name = name;
    this.socket = null;
  }

  Connect(url) {
    this.socket = new WebSocket(url);
    this.socket.onmessage = (msg) => this.onMessage(msg);
    this.socket.onerror = (event) => this.onError(event);
  }
  Disconnect() {
    this.socket.close();
  }
  SendMessage() {
    let data = {};
    data["method"] = "text";
    data["user_name"] = this.name;
    data["user_data"] = document.getElementById("user_data").value;

    this.socket.send(JSON.stringify(data));
  }

  onMessage(message) {
    updateChat(JSON.parse(message.data).responce);
  }

  onError(e) {
    alert("Some error ocurred! Can not establish connection with sever...");
  }

  status() {
    return this.socket.readyState;
  }
}

function Connect() {
  if (client == null) {
    client = new Client(document.getElementById("name").value);
  }
  if (connected == false) {
    let url = document.getElementById("url").value;
    client.Connect(url);

    connected = true;
    document.getElementById("status").setAttribute("state", "on");
  }
}

function Disconnect() {
  if (connected) {
    client.Disconnect();
    connected = false;
    client = null;

    document.getElementById("status").setAttribute("state", "off");
  }
}

function SendData() {
  if (connected) {
    client.SendMessage();
  } else {
    alert("JOIN TO ANY CHAT");
  }
}

function updateChat(text) {
  document.getElementById("chat").innerHTML += `<p>${text}</p>`;

  let chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
}
