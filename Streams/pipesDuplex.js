const fs = require("fs");
const { Duplex } = require("stream");

const streamLectura = fs.createReadStream("archivo.txt");
const streamEscritura = fs.createWriteStream("archivo-copia.txt");

const reporte = new Duplex({
  write(data, encode, callback) {
    callback();
  },
  read(size) {},
});

streamLectura.pipe(reporte).pipe(streamEscritura);
