let points = [];
let drawIndex = 0;
let waitFrames = 30;
let frameCounter = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noFill();
  createHeartbeatPoints();
}

function draw() {
  drawBackgroundGradient();

  push();
  translate(width / 2, height / 2);
  drawGlowingHeart();

  // Draw animated heartbeat line
  stroke(0);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let i = 0; i < drawIndex && i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();

  // Animate line drawing with pause at center
  if (drawIndex < points.length) {
    if (drawIndex === Math.floor(points.length / 2)) {
      frameCounter++;
      if (frameCounter > waitFrames) {
        drawIndex++;
        frameCounter = 0;
      }
    } else {
      drawIndex++;
    }
  } else {
    drawIndex = 0;
  }

  pop();
}

function drawGlowingHeart() {
  for (let glow = 6; glow > 0; glow--) {
    stroke(255, 0, 100, 20 * glow);
    strokeWeight(glow);
    noFill();
    drawHeartShape(0, 0);
  }

  fill(255, 100, 150, 180 + sin(frameCount * 2) * 50);
  stroke(255, 0, 100);
  strokeWeight(2);
  drawHeartShape(0, 0);
}

function drawHeartShape(x, y) {
  beginShape();
  vertex(x, y + 70);
  bezierVertex(x - 100, y, x - 100, y - 100, x, y - 70);
  bezierVertex(x + 100, y - 100, x + 100, y, x, y + 70);
  endShape(CLOSE);
}

function drawBackgroundGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 230, 250), color(200, 100, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function createHeartbeatPoints() {
  let raw = [
    [-150, 0], [-100, 0], // straight horizontal line
    [-90, 0], [-70, 30], [-50, -20], [-30, 0],
    [-10, -10], [10, 10], [30, -20], [50, 10], [70, -30], [90, 0]
  ];

  for (let i = 0; i < raw.length - 1; i++) {
    let [x1, y1] = raw[i];
    let [x2, y2] = raw[i + 1];
    let steps = 20;
    for (let j = 0; j <= steps; j++) {
      let x = lerp(x1, x2, j / steps);
      let y = lerp(y1, y2, j / steps);
      points.push(createVector(x, y));
    }
  }
}
