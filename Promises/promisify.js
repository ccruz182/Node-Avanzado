const fs = require("fs");
const util = require("util");

fs.writeFile("archivo2.txt", "0123456789abcdef", () => {
  console.log("OK");
});

const writeFilePromise = util.promisify(fs.writeFile);
writeFilePromise("archivo3.txt", "0123456789abcdef")
  .then(() => console.log("Promise OK"))
  .catch(() => console.log("Promise ERROR"));
