var net = require('net');
var fs = require("fs");
var server = net.createServer();

server.on("connection", function (socket) {
  console.log("Connection...")
  socket.setEncoding("utf8");
  socket.on("data", function (data) {
    console.log("Get data: " + data);

    // fs.readFile('hash.json', function (err, info) {
    //   if (err)
    //     throw err;

    //   var hashInfo = data.split(' ');
    //   var jsonObj = JSON.parse(info);
    //   try {
    //     if (data == 1) {
    //       jsonObj["L1"][0] = 1;
    //       console.log("set");
    //     }
    //     if (data === "0") {
    //       jsonObj["L1"][0] = 0;
    //       console.log("noset");
    //     }
    //     // jsonObj[hashInfo[0]][hashInfo[1]] = parseInt(hashInfo[2]);
    //   } catch (ex) {
    //     console.log("Unlegal data...");
    //   }
    //   fs.writeFile('hash.json', JSON.stringify(jsonObj), function (err) {
    //     if (err) throw err;
    //     console.log('JSON updated');
    //   });
    // });

    socket.write("Confirmed " + data)
  });
});

server.listen(8088, '0.0.0.0', function () {
  console.log("Listened...");
});
