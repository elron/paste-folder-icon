import fs from "fs";
import { Ico, IcoImage } from "@fiahfy/ico";
import Jimp from "jimp";

const ico = new Ico();
let originalBuffer;

originalBuffer = fs.readFileSync("Video call snapshot 37.png");
// originalBuffer = fs.readFileSync("img.jpg");

Jimp.read(originalBuffer)
  .then(async (image) => {
    // Do stuff with the image.
    let resizedImage = image
      .scaleToFit(256, 256) // resize
      .quality(60) // set JPEG quality
      .contain(
        256,
        256,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      );

    resizedImage.write("asd.png");

    resizedImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      console.log(buffer);
      image = IcoImage.fromPNG(buffer);
      ico.append(image);

      // buffer = fs.readFileSync("img2.png");
      // image = IcoImage.fromPNG(buffer);
      // ico.append(image);

      /* Some other PNG files */

      fs.writeFileSync("icon.ico", ico.data);
    });
  })
  .catch((err) => {
    // Handle an exception.
  });
