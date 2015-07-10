color[] facebookColors;
final int strokeW = 15;
final int colorDistance = 4;

void setup() {
  size(900, 900);
  colorMode(HSB, 100, 100, 100);
  facebookColors = new color[6];
  facebookColors[0] = #FDA094;
  facebookColors[1] = #FDCC93;
  facebookColors[2] = #FEEB98;
  facebookColors[3] = #A2F4C0;
  facebookColors[4] = #91D8FD;
  facebookColors[5] = #CBB0FD;
  
  strokeWeight(strokeW);
  
  int lastColor = 3;
  for (int i = 0; i < height; i += strokeW) {
    int c = (int)random(6);
    if (abs(c - lastColor) < colorDistance) {
      stroke(facebookColors[c]);
    }
    lastColor = c;
    
    line(0,i,width,i);
  }
}

void draw() {
}

void keyPressed() {
  saveFrame();
}

void saveFrame() {
  //Save each frame to make a movie
  saveFrame("data/image-####.png");
}

