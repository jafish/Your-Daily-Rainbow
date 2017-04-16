var capture;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  //image(capture, 0, 0);
}

planck.testbed(function(testbed) {
  var pl = planck,
    Vec2 = pl.Vec2;
  var world = new pl.World(Vec2(0, -10));

  var e_count = 10;

  var ground = world.createBody();
  ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);

  var a = 0.5;
  var shape = pl.Box(a, a);

  var x = Vec2(-7.0, 0.75);
  var y = Vec2();
  var deltaX = Vec2(0.5625, 1.25);
  var deltaY = Vec2(1.125, 0.0);

  for (var i = 0; i < e_count; ++i) {
    y.set(x);
    for (var j = i; j < e_count; ++j) {

      var body = world.createDynamicBody(y);
      body.createFixture(shape, 5.0);
      
      y.add(deltaY);
    }
    x.add(deltaX);
  }

  testbed.step = function() {
    // var tree = world.m_broadPhase.m_tree;
    // if (world.m_stepCount == 400) {
    // tree.rebuildBottomUp();
    // }
  };

  return world;
});