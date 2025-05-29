let img;

function preload() {
  img = loadImage('picture.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  img.loadPixels();
  loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      // Swap red and blue to make effect visible
      let newColor = color(b, g, r, a);
      set(x, y, newColor);
    }
  }

  updatePixels();
}

