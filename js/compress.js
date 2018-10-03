const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  const files = await imagemin(['./img/input/*.{jpg,png}'], './img/output', {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: '70-90', // When used more then 70 the image wasn't saved
        speed: 1, // The lowest speed of optimization with the highest quality
        floyd: 1 // Controls level of dithering (0 = none, 1 = full).
      })
    ]
  });

  console.log(files);
})();