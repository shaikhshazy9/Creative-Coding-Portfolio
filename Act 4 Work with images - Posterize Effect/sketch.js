let img;

function preload() {
  img = loadImage('picture.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  image(img, 0, 0, width, height);
  filter(POSTERIZE, 4); // Apply posterize effect with 4 color levels
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  image(img, 0, 0, width, height);
  filter(POSTERIZE, 4);
}
