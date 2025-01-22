let noiseScale = 0.002; // scale of the noise
let spz = 100; // spacing between blobs
let spzMin = 0.5; // percentage
let mult = 1.2; // multiplier for the noise
let margin = 0.2; // margin around the blobs in percent
let spd = 0.2; // speed of the blob points
let res = 30; // number of points in the blob
let blobs = []; // holds geometries
let scl = 1; // scale of the blobs
//let numBlobs = 10;
let layers = 5; // integer, min 1

let timestep = 100; // number of steps to run simulate before displaying

let a = 0;

function setup() {
  noiseSeed(1);
  createCanvas(windowWidth, windowHeight, SVG);
  angleMode(DEGREES);
  stroke(255);

  let r = spz / 2;
  for (
    let x = width * margin - width / 2;
    x < width - width * margin - width / 2;
    x += spz / scl
  ) {
    for (
      let y = height * margin - height / 2;
      y < height - height * margin;
      y += spz / scl
    ) {
      let b = new Blob(x, y, r, res);
      blobs.push(b);
    }
  }

  for (let t = 0; t < timestep; t++) {
    for (let b of blobs) {
      b.move();
    }
  }
}
function draw() {
  background(128);
  fill(255);

  for (let b of blobs) {
    b.show();
  }
  a += 0.5;
}
