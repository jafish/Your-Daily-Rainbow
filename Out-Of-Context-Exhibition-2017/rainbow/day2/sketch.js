// Hold the captured screen, and decide what to do if the capture isn't successful
var capture;
var captureConfirmed;
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

function setup() {
  createCanvas(windowWidth, windowHeight);
  try {
    capture = createCapture(VIDEO);
    capture.hide();
    captureConfirmed = true;
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
    captureWidth = capture.width;
    captureHeight = capture.height;
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

function keyPressed() {
  if (key === "a" || key === "A") {
    // Try to dynamically create an image based on the fact that the image
    // is in the center and based on the size of the video feed

    //capture.save("rainbow", "png");
    //capture.loadPixels();
    // for (i = 0; i < capture.width; i++) {
    //   for (j = 0; j < capture.height; j++) {
    //     if (random(2) > 1) {
    //       capture.set(i, j, color(random(255), random(255), random(255)));
    //     }
    //   }
    // }
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
}

function mousePressed() {
  // Reset the rainbow to the left of the capture
  rHeight = 0;
}