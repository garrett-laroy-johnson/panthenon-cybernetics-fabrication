let noiseScale = 0.003; // scale of the noise
let mult = 10; // multiplier for the noise
let spd = 0.1; // speed of the blob points
let radiateMag = 0.1; // magnitude of the radiate vector

let layers = 5;
let res = 20; // number of points in the blob
let heightDist = 10; // distance between layers

let renderer = "2d"; // current renderer mode
let mode = "online"; // "online" or "offline"
// if mode is offline then timestep

let timestep = 1200; // number of steps to run simulate before displaying

let canvas;

let blobs = []; // holds geometries

let wall;

function setup() {
  angleMode(RADIANS);
  noiseSeed(10);
  randomSeed(10);
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
  let centerX = wall.w / 2;
  let centerY = wall.y + wall.h / 2;

  blobs.push(new Blob(centerX, centerY));

  let maxRadius = wall.w / 2;
  let r = 15;

  let totalBlobs = 0;

  for (let radius = 0; radius < maxRadius; radius += 60) {
    let c = 2 * PI * radius; // circumference
    let numBlobs = c / (10 + r * 2); // number of blobs in the circle

    for (let angle = r; angle < 360 - r; angle += 360 / numBlobs) {
      let jitter = (radius += random(-5, 5));
      let x = jitter * cos(angle) + centerX;
      let y = jitter * sin(angle) + centerY;

      // Ensure the blob is within the wall boundaries
      if (
        x - r >= wall.x &&
        x + r <= wall.x + wall.w &&
        y - r >= wall.y &&
        y + r <= wall.y + wall.h &&
        totalBlobs < 40
      ) {
        let b = new Blob(x, y, r, res);
        blobs.push(b);
        totalBlobs++;
      }
    }
  }
}
