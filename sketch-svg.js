let noiseScale = 0.002; // scale of the noise
let spz = 150; // spacing between blobs
let spzMin = 0.8; // percentage
let mult = 0.5; // multiplier for the noise
let margin = 0.3; // margin around the blobs in percent
let spd = 0.2; // speed of the blob points
let res = 100; // number of points in the blob
let blobs = []; // holds geometries
let scl = 0.9; // scale of the blobs, density
let layers = 5; // integer, min 1
let heightDist = 10; // distance between layers

let timestep = 1200; // number of steps to run simulate before displaying

let a = 0;
let renderer = "2d"; // current renderer mode

let canvas;

let planes = [];

function setup() {
  noiseSeed(1);
  createCustomCanvas();
  definePlanes();
  initializeBlobs();
}

function draw() {
  background(128);
  displayText();

  for (let plane of planes) {
    plane.show();
  }

  for (let b of blobs) {
    b.show();
  }
  a += 0.5;
  if (renderer === "webgl") {
    orbitControl();
  }
  noLoop();
  save("blob.svg");
}

function initializeBlobs() {
  blobs = [];
  let r = spz / 2;

  if (renderer === "2d") {
    // Initialize blobs in a grid
    let marginSize = margin * Math.min(width, height);
    let startX = marginSize;
    let endX = width - marginSize;
    let startY = marginSize;
    let endY = height - marginSize;

    for (let x = startX; x < endX; x += spz / scl) {
      for (let y = startY; y < endY; y += spz / scl) {
        let b = new Blob(x, y, r, res);
        blobs.push(b);
      }
    }
  } else {
    // Initialize blobs based on planes
    for (let plane of planes) {
      for (let x = plane.x1; x < plane.x2; x += spz / scl) {
        for (let y = plane.y1; y < plane.y2; y += spz / scl) {
          // Interpolate the z value based on the x position
          let z = map(x, plane.x1, plane.x2, plane.z1, plane.z2);
          let b = new Blob(x, y, r, res);
          b.center.z = z; // Set the z position of the blob
          blobs.push(b);
        }
      }
    }
  }

  for (let t = 0; t < timestep; t++) {
    for (let b of blobs) {
      b.move();
    }
  }
}

function definePlanes() {
  // Define planes with their positions and dimensions

  let scale = 10;
  let h = 20 * scale;

  let frontWallsWidth = (14 + 4 / 12) * scale;
  let backWallWidth = (4 + 5 / 6) * scale;
  let gap = 11 * scale;
  let backBoxPlane = frontWallsWidth * 2 + gap;
  let depth = 20 * scale;

  let x1 = 0;
  let x2 = frontWallsWidth;
  let x3 = frontWallsWidth + gap;
  let x4 = frontWallsWidth + gap + frontWallsWidth;
  let x5 = backBoxPlane / 2 - backWallWidth / 2;
  let x6 = backBoxPlane / 2 + backWallWidth;

  planes.push(new Plane(x1, x2, 0, 0, h)); // Main wall plane
  planes.push(new Plane(x2, x5, 0, -depth, h)); // Main wall plane
  planes.push(new Plane(x5, x6, -depth, -depth, h)); // Main wall plane
  planes.push(new Plane(x6, x3, -depth, 0, h)); // Main wall plane
  planes.push(new Plane(x3, x4, 0, 0, h)); // Main wall plane
}
