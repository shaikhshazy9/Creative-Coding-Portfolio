function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  let carX = 250;
  let carY = 220;
  
  // Car body
  fill(255, 0, 0);
  rect(250, 220, 120, 40, 10);
  rect(275, 195, 70, 30, 8);
  
  // Windows
  fill(173, 216, 230);
  rect(280, 200, 20, 15, 3);
  rect(310, 200, 20, 15, 3);
  
  // Headlights
  fill(255, 255, 102);
  ellipse(370, 230, 10, 10);
  
  // Wheels
  fill(0);
  ellipse(275, 255, 25, 25);
  ellipse(345, 255, 25, 25);
}