var berpValue = 75;
var counter = 0;

function setup() {
  createCanvas(800, 600);
  //frameRate(10);
}

function draw() {
  background(204);
  counter++;
  newValue = berp(0.0, 100.0, counter);
  console.log("Final value: " + newValue);
  
  ellipse(width/2, height/2, newValue);
}

function berp(start, end, value) {
  value = min(value/end, 1.0);
  value = (sin(value * PI * (0.2 + 2.5 * value * value * value)) * pow(1.0 - value, 2.2) + value) * (1.0 + (1.2 * (1.0 - value)));
  return start + (end - start) * value;
} 