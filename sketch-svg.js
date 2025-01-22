let noiseScale = 0.002; // scale of the noise
let spz = 100; // spacing between blobs
let spzMin = 0.8; // percentage
let mult = 0.5; // multiplier for the noise
let margin = 0.2; // margin around the blobs in percent
let spd = 0.2; // speed of the blob points
let res = 100; // number of points in the blob
let blobs = []; // holds geometries
let scl = 1; // scale of the blobs, density
//let numBlobs = 10;
let layers = 5; // integer, min 1
let heightDist = 2; // distance between layers

let timestep = 1000; // number of steps to run simulate before displaying

let a = 0;

function setup() {
  noiseSeed(1);
  createCanvas(windowWidth, windowHeight, SVG);
  angleMode(DEGREES);
  stroke(255);
noFill();
  let r = spz / 2;
    for (
      let x = width * margin;
      x < width - width * margin;
      x += spz / scl
    ) {
      for (
        let y = height * margin;
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


  for (let b of blobs) {
    b.show();
  }
  a += 0.5;
  noLoop();
  save("blob.svg");
}
