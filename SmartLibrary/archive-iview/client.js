var net = require('net');
var client = new net.Socket();
var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('> ');
rl.prompt();

client.setEncoding("utf8");
client.connect(1024, "139.199.16.121", function () {
    console.log('Send...\n');
    rl.on('line', function (line) {
        client.write(line);
        rl.prompt();
    });
    rl.on('close', function () {
        console.log('');
        process.exit(0);
    });
});
client.on("data", function (data) {
    console.log('Response: ' + data + '\n');
});
