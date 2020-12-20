const fs = require("fs");

const streamLectura = fs.createReadStream("archivo.txt", {
  encoding: "utf-8",
});

streamLectura
  .on("open", () => {
    console.log("Abriendo archivo...");
  })
  .on("data", () => {
    console.log("****");
  })
  .on("close", () => {
    console.log("Cerrando archivo...");
  })
  .on("error", () => {
    console.log("Algo pasó...");
  });
