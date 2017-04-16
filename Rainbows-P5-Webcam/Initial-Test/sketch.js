var capture;
var bricks;
var increment = 85;

function preload() {
  bricks = loadImage("bricks_third.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
  imageMode(CENTER);
}

function draw() {
  background(125);
  translate(320, 240);
  
  console.log(capture);
  //
  for (var x = 0; x < windowWidth; x += increment) {
    for (var y = 0; y < windowHeight; y += increment) {
      //rotate(increment);
      //image(capture, x, y, 45, 45, x, y, increment-5, increment-5);
    }
  }
  
  image(capture, 0, 0);
  filter(INVERT);
}