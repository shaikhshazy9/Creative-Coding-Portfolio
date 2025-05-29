let emirates = [
  { name: "Dubai", population: 3094640 },
  { name: "Abu Dhabi", population: 1618740 },
  { name: "Sharjah", population: 1909930 },
  { name: "Al Ain", population: 666376 },
  { name: "Ajman", population: 423929 },
  { name: "Ras Al Khaimah", population: 191753 },
  { name: "Fujairah", population: 118933 },
  { name: "Umm Al Quwain", population: 59098 }
];

let maxPopulation;
let barWidth;
let chartBottom;
let chartHeight;
let chartLeft;
let chartRight;
let chartTop;
let spacing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxPopulation = max(emirates.map(e => e.population));
  textAlign(CENTER, BOTTOM);
  textSize(16);
  spacing = 20;
  calculateLayout();
}

function draw() {
  drawGradientBackground(color(20, 60, 120), color(180, 210, 255));

  fill(255);
  textSize(24);
  text("UAE Population by Emirate (2025)", width / 2, 40);
  textSize(16);

  for (let i = 0; i < emirates.length; i++) {
    let x = chartLeft + i * (barWidth + spacing);
    let barHeight = map(emirates[i].population, 0, maxPopulation, 0, chartHeight);
    let y = chartBottom - barHeight;

    // Check if mouse is over the bar
    if (
      mouseX > x &&
      mouseX < x + barWidth &&
      mouseY > y &&
      mouseY < chartBottom
    ) {
      fill(100, 150, 255);
      rect(x, y, barWidth, barHeight);
      fill(0);
      text(`${emirates[i].population.toLocaleString()}`, x + barWidth / 2, y - 5);
    } else {
      fill(100, 200, 255);
      rect(x, y, barWidth, barHeight);
    }

    // Emirate name
    fill(0);
    text(emirates[i].name, x + barWidth / 2, chartBottom + 20);
  }
}

function calculateLayout() {
  chartLeft = 100;
  chartRight = width - 100;
  chartBottom = height - 100;
  chartTop = 100;
  chartHeight = chartBottom - chartTop;
  barWidth = (chartRight - chartLeft - (emirates.length - 1) * spacing) / emirates.length;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateLayout();
}

function drawGradientBackground(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}


