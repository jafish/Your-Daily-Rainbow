PImage photo;

void setup() {
  size(100, 100);
  photo = loadImage("laDefense.jpg");
}

void draw() {
  image(photo, 0, 0);
}
