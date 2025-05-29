let sound;
let fft;
let playing = false;
let stars = [];

function preload() {
  sound = loadSound('East Duo.mp3'); // Ensure file is in your project folder
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  fft = new p5.FFT();
  noStroke();

  // Create random star positions for background
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      alpha: random(50, 100)
    });
  }
}

function draw() {
  animatedBackground();

  translate(width / 2, height / 2);
  let spectrum = fft.analyze();
  let angleStep = 360 / spectrum.length;

  for (let i = 0; i < spectrum.length; i += 4) {
    let amp = spectrum[i];
    let r = map(amp, 0, 256, 100, 300);
    let angle = i * angleStep;

    let x = r * cos(angle);
    let y = r * sin(angle);

    let hue = (frameCount + i) % 360;
    fill(hue, 80, 100);
    ellipse(x, y, 6);
  }

  // Center glow pulse
  let centerAmp = fft.getEnergy(20, 200);
  let centerSize = map(centerAmp, 0, 255, 50, 150);
  fill(0, 0, 100, 0.08);
  ellipse(0, 0, centerSize * 1.8);
  fill(0, 0, 100, 0.15);
  ellipse(0, 0, centerSize);

  // UI text
  resetMatrix();
  fill(255, map(sin(frameCount * 0.05), -1, 1, 150, 255));
  textAlign(CENTER);
  textSize(18);
  text("Click anywhere to Play/Pause Audio", width / 2, height - 40);
}

function mousePressed() {
  if (!sound.isPlaying()) {
    sound.loop();
    playing = true;
  } else {
    sound.pause();
    playing = false;
  }
}

// Improved background with rotating gradient & twinkling stars
function animatedBackground() {
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  for (let r = 0; r < max(width, height); r += 10) {
    let hue = map(r, 0, max(width, height), 220, 280); // soft purple-blue
    let alpha = map(r, 0, max(width, height), 0, 10);
    fill(hue, 40, 20, alpha);
    ellipse(0, 0, r * 2);
  }
  pop();

  // Twinkling stars
  for (let s of stars) {
    fill(0, 0, 100, s.alpha + sin(frameCount * 0.05 + s.x) * 20);
    ellipse(s.x, s.y, s.size);
  }
}