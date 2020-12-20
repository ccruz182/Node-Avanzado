const fs = require("fs");
const { Transform } = require("stream");

const streamLectura = fs.createReadStream("archivo.txt");
const streamEscritura = fs.createWriteStream("archivo-copia.txt");

streamEscritura.setDefaultEncoding("utf-8");

const filtro = new Transform({
  writableObjectMode: true,
  transform(data, encoding, callback) {
    // Proceso de transformación.
    this.push(data.toString().toUpperCase());
    callback();
  },
  final(callback) {
    // Termina lectura, empieza escritura.
    callback();
  },
});

streamLectura.pipe(filtro).pipe(streamEscritura);
