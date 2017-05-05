// Hold the captured screen, and decide what to do if the capture isn't successful
var capture;
var captureConfirmed;
var captureComplete;
var captureWidth = captureHeight = 0;
var croppedCaptureWidth = croppedCaptureHeight = 0;

// Colors for each part of the rainbow
var rC, oC, yC, gC, bC, pC;
var colors;
var backgroundColor;
var textColor;

// Alpha value for each color
var a = 175;

// Locations for the rectangles
var rX, rY;
var circleTargets;
var circleWidths;
var easing = 0.075;
var circleFixMultiplier = 1.1;

// Counter to count the number of frames that the circles have been growing
// to create a sort of bounce effect
var growthCounter;
var growthCounterIncrement = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  captureComplete = false;
  try {
    capture = createCapture(VIDEO);
    capture.hide();
    captureConfirmed = true;
    captureWidth = capture.width;
    captureHeight = capture.height;
    if (captureWidth > captureHeight) {
      croppedCaptureHeight = captureHeight;
      croppedCaptureWidth = captureHeight;
    } else {
      croppedCaptureWidth = captureWidth;
      croppedCaptureHeight = captureWidth;
    }
  } catch (e) {
    alert("Your browser does not support image capture (Google Chrome works best), or you did not give permission for the webcam. Seeing the video feed requires this permission. This all happens locally - no video is saved on the server. Only you can see it.");
    captureConfirmed = false;
    captureWidth = 640;
    captureHeight = 480;
    croppedCaptureHeight = captureHeight;
    croppedCaptureWidth = captureHeight;
  }

  ellipseMode(CENTER);
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

  circleWidths = [0, 0, 0, 0, 0, 0];
  circleTargets = [0, 0, 0, 0, 0, 0];
  growthCounter = 0;

  // Get a random color with which to set the background each time
  var rnum = Math.floor(random(6));
  backgroundColor = colors[rnum];
  rnum += 2;
  rnum = rnum % 6;

  textColor = colors[rnum];
}

function draw() {
  background(backgroundColor);

  if (captureConfirmed && !captureComplete) {
    // Check to see if the capture has been fully initialized. If it has, then
    // we can update the capture width/height variables and stop checking
    if (capture.width != captureWidth) {
      captureWidth = capture.width;
      captureHeight = capture.height;
      captureComplete = true;
      if (captureWidth > captureHeight) {
        croppedCaptureHeight = captureHeight;
        croppedCaptureWidth = captureHeight;
      } else {
        croppedCaptureWidth = captureWidth;
        croppedCaptureHeight = captureWidth;
      }

      for (var i = 0; i < 6; i++) {
        circleTargets[i] = croppedCaptureWidth - i * croppedCaptureWidth / 6;
      }
      growthCounter = 0;
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
  text("Refresh for a new background/text color", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 52);
  text("⬍: Adjust Transparency", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 36);
  text("Mouse Click: Reset Filter Animation", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 20);
  text("Spacebar: Save PNG Snapshot", width - nonCaptureHSpace + 4, height - nonCaptureVSpace - 4);

  // Set the color variables here in draw() so that alpha can be adjusted
  rC = color(253, 160, 148, a-150);
  oC = color(253, 204, 147, a-140);
  yC = color(254, 235, 152, a-120);
  gC = color(162, 244, 192, a-90);
  bC = color(145, 216, 253, a-50);
  pC = color(203, 176, 253, a);

  if (captureConfirmed) {
    image(capture, width / 2, height / 2);
  }

  rX = width / 2;
  rY = height / 2;
  rXIncrement = captureWidth / 6;
  rWidth = rXIncrement;

  growthCounter += growthCounterIncrement;
  for (var i = 0; i < 6; i++) {
    // Bounce every circle except the purple one
    if (i == 0) {
      circleWidths[i] += (circleTargets[i] - circleWidths[i]) * easing;
    } else {
      circleWidths[i] = berp(0.0, circleTargets[i], growthCounter);
    }
  }
  
  fill(pC); // Purple
  ellipse(rX, rY, circleWidths[0]);

  fill(bC); // Blue
  ellipse(rX, rY, circleWidths[1]);

  fill(gC); // Green
  ellipse(rX, rY, circleWidths[2]);

  fill(yC); // Yellow
  ellipse(rX, rY, circleWidths[3]);

  fill(oC); // Orange
  ellipse(rX, rY, circleWidths[4]);

  fill(rC); // Red
  ellipse(rX, rY, circleWidths[5]);

  if (captureComplete) {
    drawFrame(croppedCaptureWidth, croppedCaptureHeight);
  }

  // Change alpha value
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      a++;
      if (a >= 255) {
        a = 255;
      }
    } else if (keyCode === DOWN_ARROW) {
      a--;
      if (a <= 150) {
        a = 150;
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
}

function mousePressed() {
  // Reset the rainbow
  growthCounter = 0;
  circleWidths[0] = 0;
}

function drawFrame(cW, cH) {
  cropColor = color(red(backgroundColor), green(backgroundColor), blue(backgroundColor), 255);
  var centerX = width / 2;
  var centerY = height / 2;
  var leftX = centerX - cW / 2;
  var topY = centerY - cH / 2;
  var bottomY = bottomRightY = centerY + cH / 2;
  var rightX = centerX + cW / 2;

  fill(cropColor);

  // "Crop" right and left rectangles to create square video
  rect(centerX - captureWidth / 2, centerY - captureHeight / 2, captureWidth / 8, captureHeight);
  rect(centerX + captureWidth / 2 - captureWidth / 8, centerY - captureHeight / 2, captureWidth / 8, captureHeight);

  // Top-left corner
  beginShape();
  vertex(leftX, topY);
  vertex(centerX, topY);
  bezierVertex(centerX - circleFixMultiplier*(cW / 4), topY, leftX, centerY - circleFixMultiplier*(cH / 4), leftX, centerY);
  endShape();

  // Top-right corner
  beginShape();
  vertex(rightX, topY);
  vertex(centerX, topY);
  bezierVertex(centerX + circleFixMultiplier*(cW / 4), topY, rightX, centerY - circleFixMultiplier*(cH / 4), rightX, centerY);
  endShape();

  // Bottom-right corner
  beginShape();
  vertex(rightX, bottomY);
  vertex(rightX, centerY);
  bezierVertex(rightX, centerY + circleFixMultiplier*(cH / 4), centerX + circleFixMultiplier*(cW / 4), bottomY, centerX, bottomY);
  endShape();

  // Bottom-left corner
  beginShape();
  vertex(leftX, bottomY);
  vertex(leftX, centerY);
  bezierVertex(leftX, centerY + circleFixMultiplier*(cH / 4), centerX - circleFixMultiplier*(cW / 4), bottomY, centerX, bottomY);
  endShape();
}

function berp(start, end, value) {
  value = min(value / end, 1.0);
  value = (sin(value * PI * (0.2 + 2.5 * value * value * value)) * pow(1.0 - value, 2.2) + value) * (1.0 + (1.2 * (1.0 - value)));
  return start + (end - start) * value;
}