color[] facebookColors;
final int colorDistance = 1;

float r = 0;
float theta = 0;
float eStart = 150;
float thetaIncrement = 0.01;
float rIncrement;
int numLoops = 600;

void setup() {
  size(800,800);
  background(255);
  colorMode(HSB, 100, 100, 100);
  facebookColors = new color[6];
  facebookColors[0] = #FDA094;
  facebookColors[1] = #FDCC93;
  facebookColors[2] = #FEEB98;
  facebookColors[3] = #A2F4C0;
  facebookColors[4] = #91D8FD;
  facebookColors[5] = #CBB0FD;
  
  rIncrement = (width/2.0)/500.0;
  println(rIncrement);
  smooth();
}

void draw() {
  spiral();
  noLoop();
}

void spiral() {
  float prevX = -1, prevY = -1;
  float increment = eStart/numLoops;
  
  int lastColor = 3;
  for (float i = eStart; i > 0; i -= increment) {
    float x = r * cos(theta);
    float y = r * sin(theta);
    fill(0);
    
    int c = (int)random(6);
    if (abs(c - lastColor) < colorDistance) {
      stroke(facebookColors[c]);
    }
    lastColor = c;
    
    strokeWeight(i);
    if (prevX >= 0)
      line(prevX, prevY, x+width/2, y+height/2);
    prevX = x+width/2;
    prevY = y+height/2;
    theta += thetaIncrement;
    r += rIncrement;
  }
}

void keyPressed() {
  saveFrame();
}

void saveFrame() {
  //Save each frame to make a movie
  saveFrame("data/image-####.png");
}
