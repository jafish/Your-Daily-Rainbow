PImage photo;

color[] facebookColors;

void setup() {
  size(900, 900);
  colorMode(HSB, 100, 100, 100);
  background(50, 100, 100);
  facebookColors = new color[6];
  facebookColors[0] = #FDA094;
  facebookColors[1] = #FDCC93;
  facebookColors[2] = #FEEB98;
  facebookColors[3] = #A2F4C0;
  facebookColors[4] = #91D8FD;
  facebookColors[5] = #CBB0FD;
  
  photo = loadImage("03.jpg");

  photo.loadPixels();
  for (int i = 0; i < photo.width; i += 1) {
    for (int j = 0; j < photo.height; j += 1) {
      int r = (int)random(6);
      photo.pixels[i + j*photo.width] = facebookColors[r];
    }
  } 
  photo.updatePixels();
}

void draw() {
  image(photo, 0, 0);
}

void keyPressed() {
  saveFrame();
}

void saveFrame() {
  //Save each frame to make a movie
  saveFrame("data/image-####.png");
}

