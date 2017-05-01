// Hold the captured screen, and decide what to do if the capture isn't successful
var capture;
var captureConfirmed;
var captureComplete;
var captureWidth = captureHeight = 0;

// Colors for each part of the rainbow
var rC, oC, yC, gC, bC, pC;
var colors;
var backgroundColor;
var textColor;

// Alpha value for each color
var a = 175;

// Locations for the rectangles
var rX, rY, rWidth, rHeight;
var easing = 0.045;
var target;

// Image to mask the edges of the video rectangle outside of the circle
var imageMask;

function setup() {
  createCanvas(windowWidth, windowHeight);
  captureComplete = false;
  try {
    capture = createCapture(VIDEO);
    capture.hide();
    captureConfirmed = true;
    captureWidth = capture.width;
    captureHeight = capture.height;
  } catch (e) {
    alert("Your browser does not support image capture (Google Chrome works best), or you did not give permission for the webcam. Seeing the video feed requires this permission. This all happens locally - no video is saved on the server. Only you can see it.");
    captureConfirmed = false;
    captureWidth = 640;
    captureHeight = 480;
  }


  imageMode(CENTER);
  rHeight = 0;
  noStroke();
  textFont("Lobster");

  // Setup the initial colors and color array
  rC = color(253, 160, 148, a);
  oC = color(253, 204, 147, a);
  yC = color(254, 235, 152, a);
  gC = color(162, 244, 192, a);
  bC = color(145, 216, 253, a);
  pC = color(203, 176, 253, a);
  colors = [rC, oC, yC, gC, bC, pC];

  // Get a random color with which to set the background each time
  var rnum = Math.floor(random(6));
  backgroundColor = colors[rnum];
  rnum += 2;
  rnum = rnum % 6;

  textColor = colors[rnum];
}

function draw() {
  background(backgroundColor);

  if (captureConfirmed) {
    // Check to see if the capture has been fully initialized. If it has, then
    // we can update the capture width/height variables and stop checking
    if (capture.width != captureWidth) {
      captureWidth = capture.width;
      captureHeight = capture.height;
      captureComplete = true;
    }

    // Now that the video is the proper size, create the image
    if (captureComplete) {
      imageMask = createMaskingImage(captureWidth, captureHeight);
    }
  }

  var nonCaptureVSpace = (height - captureHeight) / 2;
  var nonCaptureHSpace = (width - captureWidth) / 2;

  fill(textColor);
  textSize(36);
  textAlign(CENTER);
  text("Your Daily Rainbow", width / 2, nonCaptureVSpace - height / 40);

  fill(textColor);
  textSize(20);
  textAlign(CENTER);
  text("Come back tomorrow for another filter...", width / 2, height - nonCaptureVSpace + height / 32);

  fill(textColor);
  textSize(16);
  textAlign(LEFT);
  text("⬍: Adjust Transparency", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 36);
  text("Mouse Click: Reset Filter Animation", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 20);
  text("Spacebar: Save PNG Snapshot", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 4);

  // Set the color variables here in draw() so that alpha can be adjusted
  rC = color(253, 160, 148, a);
  oC = color(253, 204, 147, a);
  yC = color(254, 235, 152, a);
  gC = color(162, 244, 192, a);
  bC = color(145, 216, 253, a);
  pC = color(203, 176, 253, a);

  if (captureConfirmed) {
    image(capture, width / 2, height / 2);
    
    // If the image overlay is ready, display it
    if (imageCreated) {
      image(imageMask, width / 2, height / 2);
    }
  }

  rX = width / 2 - captureWidth / 2;
  rY = height / 2 - captureHeight / 2;
  rXIncrement = captureWidth / 6;
  rWidth = rXIncrement;

  target = captureHeight;
  rHeight += (target - rHeight) * easing;

  fill(rC); // Red
  rect(rX, rY, rWidth, rHeight);

  fill(oC); // Orange
  rect(rX + rXIncrement * 1, rY, rWidth, rHeight);

  fill(yC); // Yellow
  rect(rX + rXIncrement * 2, rY, rWidth, rHeight);

  fill(gC); // Green
  rect(rX + rXIncrement * 3, rY, rWidth, rHeight);

  fill(bC); // Blue
  rect(rX + rXIncrement * 4, rY, rWidth, rHeight);

  fill(pC); // Purple
  rect(rX + rXIncrement * 5, rY, rWidth, rHeight);

  // Change alpha value
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      a++;
      if (a >= 255) {
        a = 255;
      }
    } else if (keyCode === DOWN_ARROW) {
      a--;
      if (a <= 0) {
        a = 0;
      }
    }
  }
}

function keyReleased() {
  if (key === " ") {
    saveCanvas(capture, 'rainbow', 'png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Make the image display size proportional to the window
  // TODO: Resize the image that I'm using to mask the video
}

function mousePressed() {
  // Reset the rainbow to the left of the capture
  rHeight = 0;
}

function CreateMaskingImage(w, h) {
  // Create an image that has an empty circle in the center to use for masking over the video
  // Assume a perfect circle, centered in the rectangle is what we want
  var img = createImage(w, h);
  img.loadPixels();
  for (i = 0; i < img.width; i++) {
    for (j = 0; j < img.height; j++) {
      // If the pixel is inside of the circle, then make it transparent
      // Otherwise, make it the same color as the background
      if ()
        img.set(i, j, backgroundColor);
    }
  }
  img.updatePixels();
  return img;
}