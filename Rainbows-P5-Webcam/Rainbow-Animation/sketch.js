// This sketch attempts to create lines that animate along the shape of the rainbow I want to create
// To do this, we'll use parametric equations and radii
var capture;
var captureWidth = captureHeight = 0;
var angle;
var angleIncrement = 0.002;
var rainbowSize;

// Colors for each arc
var rC, oC, yC, gC, bC, pC;

// Sizes for each colored arc
var rS, oS, yS, gS, bS, pS, cS;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  imageMode(CENTER);

  angle = PI + angleIncrement;
  noStroke();
  console.log("Capture width is " + captureWidth + ", and height is " + captureHeight);
  
  // Make the rainbow size proportional to the window
  rainbowSize = width / 16;
  if (width > height) {
    rS = height;
  } else {
    rS = width;
  }

  rC = color(253, 160, 148, 125);
  oC = color(253, 204, 147, 110);
  yC = color(254, 235, 152, 95);
  gC = color(162, 244, 192, 80);
  bC = color(145, 216, 253, 65);
  pC = color(203, 176, 253, 50);

  oS = rS - rainbowSize * 1;
  yS = rS - rainbowSize * 2;
  gS = rS - rainbowSize * 3;
  bS = rS - rainbowSize * 4;
  pS = rS - rainbowSize * 5;
  cS = rS - rainbowSize * 6;
}

function draw() {
  background(0, 0, 255);
  translate(width / 2, height / 2);
  //console.log("Capture width is " + capture.width + ", and height is " + capture.height);
  
  image(capture, 0, 0);
  rect(100, 0, 500, 500);
  
  // Animate the rainbow, then restart it when I reach the end
  // Draw the arc, starting at 180 degrees and move towards zero
  
  fill(rC); // Red
  arc(0, 0, rS, rS, PI, angle);
  
  fill(oC); // Orange
  arc(0, 0, oS, oS, PI, angle);

  fill(yC); // Yellow
  arc(0, 0, yS, yS, PI, angle);

  fill(gC); // Green
  arc(0, 0, gS, gS, PI, angle);

  fill(bC); // Blue
  arc(0, 0, bS, bS, PI, angle);

  fill(pC); // Purple
  arc(0, 0, pS, pS, PI, angle);

  fill(0, 0, 255);
  ellipse(0, 0, cS, cS);
  
  // Hide the rainbow so that it serves to reveal the image instead
  // of just sitting over the image
  fill(255);
  arc(0, 0, rS, rS, angle, TWO_PI);
  
  angle += angleIncrement;
  if (angle > TWO_PI) {
    angle = PI;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Make the rainbow size proportional to the window
  rainbowSize = width / 16;
  if (width > height) {
    rS = height;
  } else {
    rS = width;
  }

  oS = rS - rainbowSize * 1;
  yS = rS - rainbowSize * 2;
  gS = rS - rainbowSize * 3;
  bS = rS - rainbowSize * 4;
  pS = rS - rainbowSize * 5;
  cS = rS - rainbowSize * 6;
}