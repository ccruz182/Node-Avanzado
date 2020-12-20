const randomNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randNumber = Math.random() * 100;
      console.log("randNumber", randNumber);
      if (randNumber < 50) {
        resolve(randNumber);
      } else {
        reject(randNumber);
      }
    }, 2000);
  });
};

const result = async () => {
    console.log("Invoking...");
    try {
        const random = await randomNumber();
        console.log("Random number", random);
    } catch (err) {
        console.error("Error", err);
    }
}

result();
