let noiseScale = 0.002;
let spz = 100;
let spzMin = 0.1; // percentage
let mult = 1.2;
let margin = 0.2;
let spd = 0.1;
let res = 20;
let blobs = [];
let scl = 0.7;
//let numBlobs = 10;
let layers = 5; // integer, min 1

let timestep = 1000;

let myModel;

function mouseClicked() {
  myModel.saveObj();
}

function setup() {
  noiseSeed(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();
  angleMode(DEGREES);
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
      // b = new Blob(pos.x, pos.y, spz / 2, 10);
      let b = new Blob(x, y, spz * 0.8, res);
      blobs.push(b);
    }
  }
  myModel = buildGeometry(() => {
  for (let t = 0; t < timestep; t++) {
    for (let b of blobs) {
      b.move();
    }
  }

  for (let l = layers - 1; l > 0; l--) {
    for (let b of blobs) {
      b.build(l);
    }
  }
}

function draw() {
  background(0, 200);
  orbitControl();
  //model / show
 model(myModel)
}

class Blob {
  constructor(x, y, r, res) {
    this.center = createVector(x, y);
    this.r = r;
    this.points = [];
    this.res = res;
    this.init();
 
  }
  init() {
    for (let l = 0; l < layers; l++) {
      this.points[l] = []; // add new array

      let r = this.r * spzMin + (this.r / layers) * l; //define radius per layer
      for (let a = 0; a < 360; a += 360 / this.res) {
        let x = cos(a) * r + this.center.x;
        let y = sin(a) * r + this.center.y;
        let p = new Point(x, y, l);
        this.points[l].push(p);
      }
      let a = 0;
      let x = cos(a) * r + this.center.x;
      let y = sin(a) * r + this.center.y;
      let p = new Point(x, y, l);
      this.points[l].push(p);
    }
  }
  move() {
    for (let l = 0; l < layers; l++) {
      for (let p of this.points[l]) {
        p.move();
      }
    }
  }
  build(l) {
    let c = 255 - (255 / layers) * (l - 1);
    fill(c);
    this.geo = buildGeometry(function () {
      beginShape();
      for (let p of this.points[l]) {
        //g.vertices.push(p.pos.x, p.pos.y, 1);
        vertex(p.pos.x, p.pos.y, l * 20);
      }
      endShape();
    });
  }
  show() {
    model(this.geo);
  }
}

class Point {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.dir = createVector(0, 0);
    this.a;
    this.spd = 1;
    this.v = p5.Vector.fromAngle(this.a);
    this.v.mult(spd);
  }
  move() {
    this.a =
      map(
        noise(
          this.pos.x * noiseScale,
          this.pos.y * noiseScale,
          this.pos.z * noiseScale
        ),
        0.2,
        0.8,
        0,
        TWO_PI
      ) * mult;
    this.v = p5.Vector.fromAngle(this.a);
    this.v.mult(spd);
    this.pos.add(this.v);
  }
}
