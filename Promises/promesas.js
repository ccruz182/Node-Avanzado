const promise = require("fs").promises;

promise
  .copyFile("archivo.txt", "archivo-copia.text")
  .then(() => console.log("Then"))
  .catch((err) => console.log("Error", err))
  .finally(() => console.log("Finally"));
