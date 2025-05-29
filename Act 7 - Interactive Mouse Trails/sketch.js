let trail = [];

function setup() {
  createCanvas(1000, 1000);
  background(20);
  noStroke();
}

function draw() {
  background(20, 30); // Fading background effect

  // Add current mouse position to trail
  trail.push({ x: mouseX, y: mouseY, alpha: 255 });

  // Limit trail length
  if (trail.length > 100) {
    trail.splice(0, 1); // Remove the oldest point
  }

  // Draws trail
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    fill(100 + i, 100, 255, p.alpha); // Vary color and keep fading
    ellipse(p.x, p.y, 20 - i * 0.1); // Shrinking size for depth
    p.alpha -= 2; // Slowly fade out
  }
}
