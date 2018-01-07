var net = require('net');
var fs = require("fs");
var server = net.createServer();

server.on("connection", function (socket) {
  console.log("Connection...")
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log("Get data: " + data);

    fs.readFile('floor.json', function (err, info) {
      if (err)
        throw err;

      var hashInfo = data.split(' ');
      var jsonObj = JSON.parse(info);
      console.log(jsonObj["data"][1]["hash"][3]);
      try {
        if (data == "1") {
          jsonObj["data"][1]["hash"][3] = 0;
          console.log("set");
        }
        if (data === "0") {
          jsonObj["data"][1]["hash"][3] = 1;
          console.log("noset");
        }
        // jsonObj[hashInfo[0]][hashInfo[1]] = parseInt(hashInfo[2]);
      } catch (ex) {
        console.log("Unlegal data...");
      }
      fs.writeFile('floor.json', JSON.stringify(jsonObj), function (err) {
        if (err) throw err;
        console.log('JSON updated');
      });
    });

    socket.write("Confirmed " + data)
  });
});

server.listen(1024, '0.0.0.0', function () {
  console.log("Listened...");
});
