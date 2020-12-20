const fs = require('fs');

const streamLectura = fs.createReadStream('archivo.txt');
const streamEscritura = fs.createWriteStream('archivo-copia.txt');

streamLectura.pipe(streamEscritura);

streamLectura.on('close', () => {
    console.log('Fin lectura');
})