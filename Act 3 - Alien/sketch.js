function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  drawSpaceBackground(); // Background

  // Head
  fill(0, 128, 0);
  ellipse(300, 200, 80, 100);

  // Eyes
  fill(0);
  ellipse(285, 190, 15, 25);
  ellipse(315, 190, 15, 25);

  // Antennas
  stroke(0);
  line(280, 150, 290, 120);
  line(320, 150, 310, 120);
  fill(8, 128, 143);
  ellipse(290, 120, 10, 10);
  ellipse(310, 120, 10, 10);

  // Body
  fill(0, 128, 0);
  ellipse(300, 270, 60, 80);

  // Legs 
  stroke(0, 128, 0); 
  strokeWeight(5);
  line(290, 310, 280, 350);
  line(310, 310, 320, 350);

  // Arms
  stroke(0, 128, 0); 
  strokeWeight(5);
  line(270, 260, 240, 280);
  line(330, 260, 360, 280);

  // Reset stroke weight
  strokeWeight(1);
}

function drawSpaceBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(10, 10, 30), color(0, 0, 0), y / height);
    stroke(c);
    line(0, y, width, y);
  }

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let starSize = random(1, 3);
    noStroke();
    fill(255);
    ellipse(x, y, starSize, starSize);
  }
}

