const fs = require("fs");

let contenido = "0123456789abcdef";

const streamEscritura = fs.createWriteStream('archivo2Stream.txt');

for (let i = 0; i < 15; i++) {
  contenido += contenido;
  streamEscritura.write(contenido, res => {
    console.log("...")
});
}

fs.writeFileSync("archivo2.txt", contenido, () => {
  console.log("Se terminó la escritura");
});

/*
streamEscritura.write(contenido, res => {
    console.log("Se terminó la escritura con el stream")
});
*/