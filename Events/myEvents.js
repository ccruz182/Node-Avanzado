const fs = require("fs");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const writeStream = fs.createWriteStream("myFile.txt");
const myEmitter = new Emitter();

const fileWriter = () => {
  for (let i = 0; i < 5; i++) {
    writeStream.write(`Line #${i}\n`);
  }

  writeStream.write("== END ==");
  writeStream.end();
};

const emailNotificator = () => {
  setTimeout(() => {
    console.log("Email sent.");
    myEmitter.emit("email-ok");
  }, 1000);
};

const fileReader = () => {
  fs.readFile("myFile.txt", (error, document) => {
    console.log(document.toString());
  });
};

writeStream.on("close", () => {
  emailNotificator();
});

myEmitter.on("email-ok", () => {
  fileReader();
});

fileWriter();
