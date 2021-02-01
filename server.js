var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;
let goal = 0;
const randomGoal = () => {
  var i = Math.floor(Math.random() * 21);
  var str = i.toString();
  return str;
};
goal = randomGoal();
console.log("Goal set : ", goal);

net
  .createServer((sock) => {
    console.log(`Connect: ${sock.remoteAddress}:${sock.remotePort}`);
    let step = 1;
    //let goal = 0;
    console.log(">>> Goal : ", goal + " " + "<<<");
    sock.on("data", (data) => {
      //console.log(data.toString());
      console.log("step : ", step);

      // step 1
      if (step === 1) {
        // เช็ค sid
        if (data.toString().length == 10) {
          sock.write("OK");
          console.log(">> OK");
          //goal = randomGoal();
          step++;
        } else {
          sock.write("Wrong username");
          console.log(">> Wrong username");
          sock.destroy();
        }
      }
      // step 2-6
      else if (step >= 2 && step <= 5) {
        // เช็ค number
        if (data.toString() === goal) {
          sock.write("BINGO");
          console.log(">>data : ", data.toString() + ", " + "goal : ", goal);
          console.log(">> BINGO");
          console.log("###############################");
          goal = randomGoal();
        } else {
          console.log(">> data : ", data.toString() + ", " + "goal : ", goal);
          console.log(">> WRONG");
          sock.write("WRONG");
          step++;
        }
      } else if (step === 6) {
        sock.destroy();
        console.log("###############################");
      }
    });

    sock.on("error", (err) => {
      console.log("err : ", err);
    });
  })
  .listen(PORT, HOST);

console.log(`Server start: ${HOST}:${PORT}`);