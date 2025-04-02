class Blobby {
  constructor(x, y, r, res) {
    this.center = createVector(x, y);
    this.points = [];

    this.r = r;
    this.rDist = this.r / params.layers;
    this.spawn();
  }

  spawn() {
    for (let l = 1; l <= params.layers; l++) {
      // If l is in the skipped range (after the outermost layer), skip it
      if (l < params.layers && l >= params.layers - params.skippedLayers) {
        this.points[l - 1] = [];
      } else {
        this.points[l - 1] = [];
        for (let a = 0; a < 360; a += 360 / params.res) {
          let x = this.center.x + sin(a) * this.rDist * l;
          let y = this.center.y + cos(a) * this.rDist * l * (18 / 20);
          let z = (params.zHeight / params.layers) * l;
          let v = new Point(x, y, z, a);
          this.points[l - 1].push(v);
        }
      }
    }
  }

  move() {
    for (let l = 0; l < params.layers; l++) {
      for (let p of this.points[l]) {
        p.move();
      }
    }
  }

  show() {
    push();
    stroke(255);
    strokeWeight(1);
    for (let l = 0; l < params.layers; l++) {
      beginShape();
      for (let p of this.points[l]) {
        vertex(p.pos.x, p.pos.y);
      }
      endShape(CLOSE);
    }
    pop();
  }
}

class Point {
  constructor(x, y, z, angle) {
    this.pos = createVector(x, y, z);
    this.a;
    this.v = p5.Vector.fromAngle(this.a);
  }

  move() {
    this.a =
      map(
        noise(
          this.pos.x * params.noiseScale,
          this.pos.y * params.noiseScale,
          this.pos.z * params.noiseScale * params.zMult
        ),
        0.2,
        0.8,
        0,
        TWO_PI
      ) * params.mult;
    this.v = p5.Vector.fromAngle(this.a);
    this.pos.add(this.v);
  }
}
