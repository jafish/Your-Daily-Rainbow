color[] facebookColors;
final int colorDistance = 5;
int lastFillColor;
int lastStrokeColor;
int fillColor, strokeColor;
float sizeDivider = 0.1;
float sizeIncrement = 0.1;

void setup() {
  size(900, 900);
  background(255);
  lastFillColor = 3;
  lastStrokeColor = 3;
  strokeWeight(5);
  noStroke();
  noLoop();
  colorMode(HSB, 100, 100, 100);
  facebookColors = new color[6];
  facebookColors[0] = #FDA094;
  facebookColors[1] = #FDCC93;
  facebookColors[2] = #FEEB98;
  facebookColors[3] = #A2F4C0;
  facebookColors[4] = #91D8FD;
  facebookColors[5] = #CBB0FD;
}

void draw() {
  if (frameCount > 1) {

    sizeDivider += sizeIncrement;

    fillColor = (int)random(6);
    if (abs(fillColor - lastFillColor) < colorDistance) {
      fill(facebookColors[fillColor]);
    }
    lastFillColor = fillColor;

    /*strokeColor = (int)random(6);
     if (abs(strokeColor - lastStrokeColor) < colorDistance) {
     stroke(facebookColors[strokeColor]);
     }
     lastStrokeColor = strokeColor;*/

    ellipse(mouseX, mouseY, width/sizeDivider, height/sizeDivider);
    ellipse(width-mouseX, height-mouseY-40, width/sizeDivider, height/sizeDivider);
  }
}

void keyPressed() {
  final int k = keyCode;

  if (k == 'S')
    if (looping) {
      noLoop();
    } else {
      loop();
    }
  saveFrame();
}

void saveFrame() {
  //Save each frame to make a movie
  saveFrame("data/image-" + frameCount + ".png");
}

