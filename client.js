var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, () => {
  console.log(`Connect server to: ${HOST}:${PORT}`);
  client.write(`6035512024`);
});

client.on("data", (data) => {
  console.log(`Data from server : ${data}`);
  if (data.toString() === "OK") {
    client.write(random());
  } else if (data == "WRONG") {
    client.write(random());
  } else {
    client.destroy();
  }
});

const random = () => {
  var i = Math.floor(Math.random() * 21);
  var str = i.toString();
  return str;
};

client.on("close", () => {
  console.log(`Connect close !!`);
});

client.on("error", (err) => {
  console.log(`err !! = ${err}`);
});