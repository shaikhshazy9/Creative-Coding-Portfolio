let letters = [];
let message = "Welcome to Bath Spa University";
let particles = [];
const connectionDist = 120;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Georgia');
  textSize(48);
  textAlign(CENTER, CENTER);

  let spacing = textWidth(message) / message.length;
  let startX = width / 2 - (spacing * message.length) / 2;

  for (let i = 0; i < message.length; i++) {
    let x = startX + i * spacing;
    letters.push(new InteractiveLetter(message[i], x, height / 2));
  }

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0); // BLACK background

  // Draw connections between particles
  stroke(255, 100);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = particles[i].pos.dist(particles[j].pos);
      if (d < connectionDist) {
        let alpha = map(d, 0, connectionDist, 255, 0);
        stroke(255, alpha * 0.4);
        line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
      }
    }
  }

  for (let p of particles) {
    p.update();
    p.display();
  }

  for (let l of letters) {
    l.update();
    l.display();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.3, 1));
    this.baseSize = random(2, 5);
    this.size = this.baseSize;
    this.opacity = random(100, 200);
    this.pulseSpeed = random(0.01, 0.03);
    this.pulsePhase = random(TWO_PI);
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.pos, mouse);
    let d = dir.mag();

    // Repel from mouse if close
    if (d < 150) {
      dir.normalize();
      dir.mult(2 * (150 - d) / 150); // stronger repulsion when closer
      this.vel.add(dir);
    }

    this.vel.limit(1.5);
    this.pos.add(this.vel);

    // Wrap edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

    // Pulse size
    this.size = this.baseSize + sin(frameCount * this.pulseSpeed + this.pulsePhase) * 1.5;
  }

  display() {
    noStroke();
    fill(255, this.opacity);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

class InteractiveLetter {
  constructor(char, x, y) {
    this.char = char;
    this.home = createVector(x, y);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.color = color(255); // white default
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.pos, mouse);
    let d = dir.mag();

    if (d < 100) {
      dir.normalize();
      dir.mult(100 / d);
      this.acc.add(dir);
    }

    let homeForce = p5.Vector.sub(this.home, this.pos).mult(0.05);
    this.acc.add(homeForce);

    this.vel.add(this.acc);
    this.vel.mult(0.9);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    fill(this.color);
    noStroke();
    text(this.char, this.pos.x, this.pos.y);
  }

  randomizeColor() {
    this.color = color(random(150, 255), random(100, 255), random(150, 255));
  }
}

function mousePressed() {
  for (let l of letters) {
    l.randomizeColor();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  letters = [];
  setup();
}