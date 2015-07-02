PImage photo;

color facebookRed = #FDA094;
color facebookOrange = #FDCC93;
color facebookYellow = #FEEB98;
color facebookGreen = #A2F4C0;
color facebookBlue = #91D8FD;
color facebookPurple = #CBB0FD;

color[] facebookColors = { facebookRed, facebookOrange, facebookYellow, facebookGreen, facebookBlue, facebookPurple};

void setup() {
  size(900, 900);
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
