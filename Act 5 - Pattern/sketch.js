let cols, rows;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(210, 10, 15); // dark steel-blue background
  cols = 12;
  rows = 16;
  cellSize = windowWidth / cols;
}

function draw() {
  background(210, 10, 15);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      rotate(radians(int(random(4)) * 90));
      industrialSymbol();
      pop();
    }
  }
  noLoop();
}

function mousePressed() {
  loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cellSize = windowWidth / cols;
}

/*-------Industrial Symbol Function (Bold Style)-------*/
function industrialSymbol() {
  let shapeType = int(random(3));
  let baseColor = color(random(200, 240), 30, random(40, 70)); // muted steel tones
  let detailColor = color(0, 0, 20); // dark shadow details

  if (shapeType === 0) {
    // Gear-like shape
    fill(baseColor);
    for (let i = 0; i < 6; i++) {
      rect(-cellSize / 8, -cellSize / 2.5, cellSize / 4, cellSize / 6);
      rotate(PI / 3);
    }
    fill(detailColor);
    circle(0, 0, cellSize / 3);
  } else if (shapeType === 1) {
    // Blade cross
    fill(baseColor);
    rect(-cellSize / 2.5, -cellSize / 10, cellSize / 1.25, cellSize / 5);
    rotate(HALF_PI);
    rect(-cellSize / 2.5, -cellSize / 10, cellSize / 1.25, cellSize / 5);
    fill(detailColor);
    circle(0, 0, cellSize / 4);
  } else {
    // Shield shape
    fill(baseColor);
    beginShape();
    vertex(-cellSize / 4, -cellSize / 3);
    vertex(cellSize / 4, -cellSize / 3);
    vertex(cellSize / 3, 0);
    vertex(0, cellSize / 2.5);
    vertex(-cellSize / 3, 0);
    endShape(CLOSE);

    fill(detailColor);
    triangle(-cellSize / 10, 0, cellSize / 10, 0, 0, cellSize / 6);
  }
}

