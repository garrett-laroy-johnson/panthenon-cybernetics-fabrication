let noiseScale = 0.001; // scale of the noise
let mult = 2; // multiplier for the noise
let spd = 0.5; // speed of the blob points
let radiateMag = 0.1; // magnitude of the radiate vector

let res = 10; // number of points in the blob
let heightDist = 10; // distance between layers

let renderer = "2d"; // current renderer mode
let mode = "online"; // "online" or "offline"
// if mode is offline then timestep

let timestep = 1200; // number of steps to run simulate before displaying

let canvas;

let blobs = []; // holds geometries

let wall;

let rows = 10;
let cols = 5;

function setup() {
  angleMode(RADIANS);
  noiseSeed(10);
  createCustomCanvas();

  wall = {
    // width: 44", height: 9.25"
    x: 0,
    w: width,
    h: width / 4.75,
    y: height / 4,
  };
  initializeBlobs();
}

function draw() {
  background(128);
  // displayText();

  push();
  noFill();
  rect(wall.x, wall.y, wall.w, wall.h);
  pop();
  strokeWeight(1);

  for (let b of blobs) {
    if (frameCount < timestep) {
      b.move();
    }
    b.show();
  }

  if (renderer === "webgl") {
    orbitControl();
  }
  //noLoop();
  //save("blob.svg");
  if (mult < 2) {
    mult += 0.001;
  }
}

function initializeBlobs() {
  let xSpace = width / rows;
  let ySpace = wall.h / cols;

  let xCenter = wall.w / 2;
  let yCenter = wall.y + wall.h / 2;

  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    for (let r = 0; r < 1; r += 0.1) {
      let x = ((r * wall.w) / 2) * cos(a) + xCenter;
      let y = ((r * wall.h) / 2) * sin(a) + yCenter;

      let b = new Blob(x, y);
      blobs.push(b);
    }
  }
}
