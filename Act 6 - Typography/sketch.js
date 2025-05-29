let fontSize = 80;
let amplitude = 20;  // This shows how high the letters bounce
let frequency = 0.1;

function setup() {
  createCanvas(1000, 1000);
  textFont('Georgia'); // Font
  textSize(fontSize);
  textAlign(CENTER, CENTER);
}

function draw() {
  background("#E8F0F2"); // light background
  fill("#1C3879"); // Text color

  let baseX = width / 2;
  let baseY = height / 2;
  let word = "CREATIVE CODING";

  for (let i = 0; i < word.length; i++) {
    let charX = baseX - (word.length * fontSize * 0.3) + i * fontSize * 0.6;
    let charY = baseY + sin(frameCount * frequency + i * 0.5) * amplitude;
    text(word[i], charX, charY);
  }
}


