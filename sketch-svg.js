// field params
let noiseScale = 0.0015; // scale of the noise
let mult = 3.5; // multiplier for the noise
let nSeed = 53;

//let spd = 1; // speed of the blob points

//blob placement
let maxBlobs = 40; // Limit the number of blobs to prevent excessive calculations
let angleIncrement = 10; // Angle increment for the spiral
let radiusIncrement = 0.2; // Radius increment for the spiral, 0 to 1, 1 being the full radius of the wall
let maxJitter = 10; // jitter for the blob points

//blob params
let layers = 5;
let res = 100; // number of points in the blob
let heightDist = 10; // distance between layers
let r; // radius of the blob/ determined in initializeBlobs relative to wall / pixel size

let timestep = 35; // number of steps to run simulate before displaying

let blobs = []; // holds geometries
let wall;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, SVG);
  angleMode(DEGREES);
  noiseSeed(nSeed);
  randomSeed(18);
  initializeWall();
  initializeBlobs();
}

function draw() {
  angleMode(RADIANS);
  drawWall();
  noFill();

  for (let b of blobs) {
    b.move();
    b.show();
  }

  fill(255);
  text(frameCount, 10, 10);

  if (frameCount > timestep) {
    noLoop();
    // save("blob.svg");
  }
}

function initializeBlobs() {
  r = wall.h / 15; // max size for the blob should be 16 x 18",

  let centerX = wall.x + wall.w / 2;
  let centerY = wall.y + wall.h / 2;

  let maxRadiusX = wall.w / 2;
  let maxRadiusY = wall.h / 2;

  let radiusIncrementX = radiusIncrement * maxRadiusX;
  let radiusIncrementY = radiusIncrement * maxRadiusY;

  let radiusX = 0;
  let radiusY = 0;

  let angle = 0;
  let totalBlobs = 0;

  while (radiusX < maxRadiusX && totalBlobs < maxBlobs) {
    let x = radiusX * cos(angle) + centerX;
    let y = radiusY * sin(angle) + centerY;

    // Ensure the blob is within the wall boundaries
    if (
      x - r >= wall.x &&
      x + r <= wall.x + wall.w &&
      y - r >= wall.y &&
      y + r <= wall.y + wall.h
    ) {
      let overlap = false;
      for (let b of blobs) {
        let d = dist(x, y, b.center.x, b.center.y);
        if (d < r * 2) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        let b = new Blob(x, y, r, res);
        blobs.push(b);
        totalBlobs++;
      }
    }

    angle += angleIncrement;
    radiusX += radiusIncrementX * (angleIncrement / 360); // Increase radius gradually to create a spiral
    radiusY += radiusIncrementY * (angleIncrement / 360); // Increase radius gradually to create a spiral
  }

  console.log(blobs);
}

function drawWall() {
  background(128);

  push();
  noFill();
  rect(wall.x, wall.y, wall.w, wall.h);
  pop();
  strokeWeight(1);
}

function initializeWall() {
  wall = {
    // width: 44", height: 9.25"
    x: 0,
    w: width,
    h: width / 4.75,
    y: height / 4,
  };
}
