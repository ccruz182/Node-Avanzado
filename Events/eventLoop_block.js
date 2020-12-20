const fs = require('fs');
const http = require('http');

const readFile = () => {
    // Sync read.
    // fs.readFileSync('myFile.txt', 'utf-8');

    const readStream = fs.createReadStream('myFile.txt', {encoding: 'utf8'});
}

http.createServer((req, res) => {
    for (let a = 0; a <= 500; a++) {
        readFile();
    }

    res.write('Hello world');
    res.end();
}).listen(8000);