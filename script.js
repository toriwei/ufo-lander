let grassImage;
let starsImage;
let moonImage;
let treetrunkImage;
let ufoScale = 80;
let ufoRotation = 0;
let starRotation = 0;
let moonRotation = 0;
let elevation = -300;
let treeHeight = 100;
let treeRadius = 25;
let canvasSize = 700;
let treeCoordinates = [
  [treeRadius * 4 - canvasSize / 2, 70, 0],
  [canvasSize / 2 - treeRadius * 4, 70, 0],
  [treeRadius * 10 - canvasSize / 2, 70, 450],
  [canvasSize / 2 - treeRadius * 10, 70, 450]
];
let lightCoordinates = [[55, 12, 0], [-55, 12, 0], [0, 12, -55], [0, 12, 55]];
let gravity = 3;

function preload() {
  grassImage = loadImage(
    "https://cdn.glitch.com/138b71dd-46b3-40cc-8bf3-ad7decf31caa%2Fgrass.png?v=1606266715175"
  );
  starsImage = loadImage(
    "https://cdn.glitch.com/138b71dd-46b3-40cc-8bf3-ad7decf31caa%2Fstars.jpg?v=1606333019697"
  );
  moonImage = loadImage(
    "https://cdn.glitch.com/138b71dd-46b3-40cc-8bf3-ad7decf31caa%2FmoonTexture.jpg?v=1606535354480"
  );
  treetrunkImage = loadImage(
    "https://cdn.glitch.com/138b71dd-46b3-40cc-8bf3-ad7decf31caa%2Ftreetrunk.jpg?v=1606607516978"
  );
}

function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  noStroke();
}

function draw() {
  background("midnightblue");
  directionalLight(255, 255, 255, 1, 1, -1);
  pointLight(255, 255, 255, 0, elevation - 30, 0);
  drawGround();
  drawStars();
  drawTrees();
  drawMoon();
  drawUfo();
  lowerUfo();
  if (elevation >= 190) {
    noLoop();
  }
}

function drawGround() {
  push();
  texture(grassImage);
  spotLight(255, 255, 255, 0, elevation, 0, 0, 1, 0, Math.PI / 6, 3);
  translate(0, 200, 0);
  rotateX(Math.PI / 2);
  plane(canvasSize * 1.5, canvasSize * 1.5);
  pop();
}

function drawStars() {
  push();
  rotateX(starRotation);
  rotateY(starRotation);
  texture(starsImage);
  translate(0, 0, -500);
  plane(canvasSize * 2, canvasSize * 2);
  starRotation -= 0.0001;
  pop();
}

function drawTrees() {
  for (let treeCoordinate of treeCoordinates) {
    push();
    translate(...treeCoordinate);
    texture(treetrunkImage);
    cylinder(treeRadius, treeHeight);
    translate(0, -treeHeight, 0);
    ambientMaterial("green");
    cone(treeRadius * 2, -treeHeight);
    pop();
  }
}
function drawMoon() {
  push();
  rotateZ(moonRotation);
  texture(moonImage);
  translate(canvasSize * 0.35, -canvasSize * 0.35, 0);
  sphere(60);
  moonRotation += 0.0002;
  pop();
}

function drawUfo() {
  push();
  drawBody();
  drawAntenna();
  drawWindow();
  drawTopLights();
  drawBottomLight();
  pop();
}

function drawBody() {
  shininess(40);
  rotateY(ufoRotation);
  translate(0, elevation, 0);
  scale(1, 0.25, 1);
  specularMaterial("lightblue");
  sphere(ufoScale);
  specularMaterial("purple");
  translate(0, -80, 0);
  scale(1, 4, 1);
  sphere(ufoScale/2);
}

function drawAntenna() {
  push();
  translate(0, -50, 0);
  emissiveMaterial("pink");
  cylinder(2, 20);
  translate(0, -10, 0);
  emissiveMaterial("yellow");
  sphere(ufoScale/16);
  pop();
}

function drawWindow() {
  push();
  translate(0, -15, 20);
  emissiveMaterial("lightblue");
  sphere(ufoScale/4);
  pop();
}

function drawTopLights() {
  for (let lightCoordinate of lightCoordinates) {
    push();
    translate(...lightCoordinate);
    emissiveMaterial("yellow");
    sphere(ufoScale/8);
    pop();
  }
}

function drawBottomLight() {
  translate(0, 40, 0);
  emissiveMaterial("white");
  sphere(ufoScale/10);
  ufoRotation += 0.02;
}

function lowerUfo() {
  elevation += gravity;
  if (gravity > 0.5) {
    gravity -= 0.01;
  }
}
