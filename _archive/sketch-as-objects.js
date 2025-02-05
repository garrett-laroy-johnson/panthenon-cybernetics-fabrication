let noiseScale = 0.002;
let spz = 100;
let spzMin = 0.5; // percentage
let mult = 1.2;
let margin = 0.2;
let spd = 0.2;
let res = 30;
let blobs = []; // holds geometries
let scl = 1;
//let numBlobs = 10;
let layers = 7; // integer, min 1

let timestep = 300;

let a = 0;
function mouseClicked() {
  // myModel.saveObj();
}

function setup() {
  noiseSeed(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  // stroke(255);
  noStroke();
  fill(255);
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
  //rotateY(90);
  rotateX(240);
  rotateZ(a);
  background(128);
  fill(255);
  orbitControl();
  for (let b of blobs) {
    b.show();
  }
  a += 0.5;
}
