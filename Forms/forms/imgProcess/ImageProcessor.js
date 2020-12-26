const { quality } = require("jimp");
const Jimp = require("jimp");

module.exports = class ImageProcessor {
  resize = (fileInfo, width = 250, height = 250) => {
      console.log("fileInfo", fileInfo);
    return new Promise((resolve, reject) => {
      Jimp.read(fileInfo.path)
        .then((image) =>
          image
            .resize(width, Jimp.AUTO)
            .quality(80)
            .writeAsync(`./public/images/optimized/${fileInfo.filename}`)
            .then(() => resolve())
        )
        .catch((error) => reject());
    });
  };
};
