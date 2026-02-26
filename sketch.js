let bgImg;
let paintLayer;

let letters = ["B", "R", "A", "T"];
let step = 0;

let flashAlpha = 0;
let nextFlashFrame = 0;

let stamps = [];

let brushSize = 40;
let brushCol;

let normalLife = 300;   
let finalLife = 200;   

function preload() {
  bgImg = loadImage("hair.jpg");
}

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  textFont("Arial");
  textStyle(BOLD);
  
  paintLayer = createGraphics(width, height);
  paintLayer.clear();

  brushCol = color('#8ACD01');
  brushCol.setAlpha(80);

  scheduleNextFlash();
}

function draw() {
  image(bgImg, 0, 0, width, height);
  
  image(paintLayer, 0, 0);
  
  if (mouseIsPressed) {
    paintLayer.noStroke();
    paintLayer.fill(brushCol);
    paintLayer.rectMode(CENTER);
    paintLayer.rect(mouseX, mouseY, brushSize, brushSize);
  }

  // Brush
  noStroke();
  fill(brushCol);
  rect(mouseX, mouseY, brushSize, brushSize);


  if (frameCount >= nextFlashFrame) {
    triggerFlash();
    scheduleNextFlash();
  }

  noStroke();
  fill(0);

  // Text Form
  for (let i = stamps.length - 1; i >= 0; i--) {
    let s = stamps[i];

    textSize(s.size);
    text(s.word, s.x, s.y);

    s.life -= deltaTime;

    if (s.life <= 0) {
      stamps.splice(i, 1);
    }
  }

  // flash
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha *= 0.85;
    if (flashAlpha < 2) flashAlpha = 0;
  }
}


function scheduleNextFlash() {
  nextFlashFrame = frameCount + floor(random(6, 12));
}

function triggerFlash() {
  flashAlpha = random(160, 255);

  step++;

  if (step > letters.length) {
    stamps = [];
    step = 0;
    return;
  }

  let word = letters.slice(0, step).join("");


  let count = floor(random(1, 3));

  for (let i = 0; i < count; i++) {
    let size = random(150, 220);

    // random spot
    let margin = 60;
    let x = random(margin, width - margin);
    let y = random(margin, height - margin);

    stamps.push({
      word: word,
      x: x,
      y: y,
      size: size,
      life: (step === letters.length) ? finalLife : normalLife
    });
  }
}
