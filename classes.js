class Blob {
  constructor(x, y, r) {
    this.center = createVector(x, y);
    this.r = r;
    this.res = res;
    this.points = [];
    this.init();
  }
  init() {
    for (let l = 0; l < layers; l++) {
      this.points[l] = [];
      let r = this.r * spzMin + (this.r / layers) * l; //define radius per layer

      for (let a = 0; a < 360; a += 360 / res) {
        let x = cos(a) * r + this.center.x;
        let y = sin(a) * r + this.center.y;
        let z = l;
        let v = new Point(x, y, z);
        this.points[l].push(v);
      }
    }
  }

  move() {
    for (let l = 0; l < layers; l++) {
      for (let p of this.points[l]) {
        p.move();
      }
    }
  }

  show() {
    for (let l = 0; l < layers; l++) {
      beginShape();
      let c = 255 - (255 / layers) * (l - 1);

      fill(c);
      for (let p of this.points[l]) {
        //g.vertices.push(p.pos.x, p.pos.y, 1);
        vertex(p.pos.x, p.pos.y, l * 20);
        //  vertex(p.pos.x, p.pos.y, (l - 1) * 20);
      }
      endShape(CLOSE);
    }
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
