/* The Sound of an Effect (p5js version) by Hsinyu Lin, 2017 */

var f, f1;
var pos = 0.00003;
var capture;
var button;
var fIncrement = 85;
var f1Increment = PI/16;

function setup() {
 createCanvas(windowWidth, windowHeight);
 capture = createCapture(VIDEO);
 capture.hide();
 imageMode(CENTER);
 
 //button = createButton('hide sketch');
 //button.position(10, 44);
 //button.mousePressed(toggleSketch);
}

function draw() {
  
 background(255);
 //translate(100, 100);
 translate(width / 4, height / 4);
 //image(capture, 0, 0, 320, 240, 50, 50, 320, 240);
 //translate(100, 0);
 //image(capture, 0, 0, 640, 240, 0, 0);
 
 //fIncrement += 0.5;
 
 
 console.log(fIncrement + ", " + f1Increment);
 for (f = 0; f < windowWidth; f += fIncrement) {
  for (f1 = 0; f1 < windowHeight; f1 += fIncrement) {
    //image(capture, f, f1, 65, 85);
    rotate(f1Increment);
    //image(capture, f + random(1, 10), f1 + random(1, 10), 65, 65, f + random(0.5, 1), f1, [80 + random(1, 3)], [80]);
    image(capture, f, f1, 65, 65, f, f1, fIncrement-5, fIncrement-5);
  }
 }
 //fIncrement = mouseX;
 f1Increment = PI*mouseY/1028;
}

function mouseWheel(event) {
 print(event.delta);
 pos += event.delta;
 console.log(pos);
}

function toggleSketch() {
  console.log(canvas.style.display)
  if (canvas.style.display === 'none') {
    canvas.style.display = 'block';
    button.html('hide sketch');
  } else {
    canvas.style.display = 'none';
    button.html('show sketch');
  }
}