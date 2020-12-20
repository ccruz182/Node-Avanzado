const fs = require('fs');

console.time('Tiempo de respuesta');

/*
for (let i = 0; i <= 100; i++) {
    fs.readFileSync('archivo.txt', 'utf-8');
}
*/


for (let i = 0; i <= 100; i++) {
    const streamLectura = fs.createReadStream('archivo.txt', {
        encoding: 'utf-8'
    })
}


console.timeEnd('Tiempo de respuesta');