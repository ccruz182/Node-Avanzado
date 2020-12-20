const https = require("https");

const req = https.get(
  "https://en.wikipedia.org/w/api.php?action=help&format=json",
  (res) => {
    console.log("Data ok", res);

    res.on("data", (data) => {
      console.log("Recibiendo datos...");
    });

    res.on("end", (data) => {
      console.log("Termina conexión");
    });
  }
);

req.on("socket", (data) => {
  console.log("Http init", data);
});

req.on("error", (error) => {
  console.log("Error", error);
});
