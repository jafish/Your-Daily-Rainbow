var capture;
var captureWidth = captureHeight = 0;

// Colors for each arc
var rC, oC, yC, gC, bC, pC;

// Alpha value for each color
var a = 175;

// Locations for the rectangles
var rX, rY, rWidth;
var rWidthIncrement = 0.1;
var easing = 0.05;
var target;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  imageMode(CENTER);
  rWidth = 0;
  noStroke();
  
  rC = color(253, 160, 148, a);
  oC = color(253, 204, 147, a);
  yC = color(254, 235, 152, a);
  gC = color(162, 244, 192, a);
  bC = color(145, 216, 253, a);
  pC = color(203, 176, 253, a);
}

function draw() {
  background(0, 0, 255);
  //translate(width / 2, height / 2);
  //console.log("Capture width is " + capture.width + ", and height is " + capture.height);

  image(capture, width/2, height/2);
  
  rX = width/2 - capture.width/2;
  rY = height/2 - capture.height/2;
  rYIncrement = capture.height/6;
  
  target = capture.width;
  rWidth += (target - rWidth) * easing;
  
  fill(rC); // Red
  rect(rX, rY, rWidth, rYIncrement);
  
  fill(oC); // Orange
  rect(rX, rY + rYIncrement * 1, rWidth, rYIncrement);

  fill(yC); // Yellow
  rect(rX, rY + rYIncrement * 2, rWidth, rYIncrement);

  fill(gC); // Green
  rect(rX, rY + rYIncrement * 3, rWidth, rYIncrement);

  fill(bC); // Blue
  rect(rX, rY + rYIncrement * 4, rWidth, rYIncrement);

  fill(pC); // Purple
  rect(rX, rY + rYIncrement * 5, rWidth, rYIncrement);
}