let stars = [];
let centerX, centerY;
let colorThemes;
let currentTheme = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;

  // Create 300 stars with random properties
  for (let i = 0; i < 300; i++) {
    stars.push(new Star());
  }

  // Define different color themes for the stars
  colorThemes = [
    [color(255, 204, 0), color(255, 102, 102)],
    [color(0, 255, 255), color(0, 102, 204)],
    [color(255, 0, 255), color(100, 0, 200)],
    [color(255), color(180)]
  ];
}

function draw() {
  background(10); // Dark background for better contrast

  // Center point follows mouse
  centerX = mouseX;
  centerY = mouseY;

  // Update and draw all stars
  for (let star of stars) {
    star.update();
    star.show();
  }

  // Display instructions at bottom
  fill(255);
  noStroke();
  textSize(16);
  text("Move mouse to control center | Press any key to change colors", 20, height - 20);
}

function keyPressed() {
  // Change to the next color theme
  currentTheme = (currentTheme + 1) % colorThemes.length;
}

class Star {
  constructor() {
    this.angle = random(TWO_PI); // Random angle for circular motion
    this.radius = random(50, min(width, height) / 2); // Distance from center
    this.speed = random(0.001, 0.01); // Rotation speed
    this.size = random(2, 6); // Size of the star
    this.alpha = random(100, 255); // Transparency
  }

  update() {
    this.angle += this.speed; // Rotate the star
  }

  show() {
    // Calculate position based on angle and radius
    let x = centerX + cos(this.angle) * this.radius;
    let y = centerY + sin(this.angle) * this.radius;

    // Get current color theme and blend between two colors
    let [c1, c2] = colorThemes[currentTheme];
    let c = lerpColor(c1, c2, this.radius / (min(width, height) / 2));
    c.setAlpha(this.alpha);

    // Draw the star
    fill(c);
    noStroke();
    ellipse(x, y, this.size);
  }
}


