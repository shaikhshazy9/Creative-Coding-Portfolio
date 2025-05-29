let img;

function preload() {
  img = loadImage('picture.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  for (let i = 0; i < 500; i++) {
    let x = int(random(img.width));
    let y = int(random(img.height));
    let c = img.get(x, y);
    fill(c);
    ellipse(x, y, 6, 6);
  }
}

