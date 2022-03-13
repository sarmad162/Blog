const http = require('http');

const server = http.createServer((req, res) => {

    switch (req.url) {

        case '/':
            res.writeHead(200);
            res.end('https//www.google.com');
            break;

        case '/index':
            res.writeHead(200);
            res.end('index');
            break;

        default:
            res.writeHead(404);
            res.end('Error');
            break;
    }


});

server.listen('3000');
console.log('we are live on port 3000');












/*const os = require('os');

const user = os.userInfo();
const fs = require('fs');

const _ = require('lodash');

console.log(_.isNumber(1));

const math = require('./math');

console.log(math.sum(4, 5))
console.log(math.name);




fs.appendFile('sarmad.txt', `\n Hello : ${user.username} Ali`, err => {
    if (err) throw err;
    console.log('The data appended to file');
});

console.log(os.version());
console.log('Hello : ' + user.username);
console.log(`Hello : ${user.username}`);
*/