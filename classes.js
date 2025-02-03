class Blob {
  constructor(x, y, r, res) {
    this.center = createVector(x, y);
    this.points = [];

    this.r = r;
    this.rDist = this.r / layers;
    this.spawn();
  }

  spawn() {
    for (let l = 1; l < layers + 1; l++) {
      this.points[l - 1] = [];
      for (let a = 0; a < 360; a += 360 / res) {
        let x = this.center.x + sin(a) * this.rDist * l;
        let y = this.center.y + cos(a) * this.rDist * l;
        let z = l * heightDist;
        let v = new Point(x, y, z, a);
        this.points[l - 1].push(v);
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
    if (renderer === "webgl") {
      push();
      translate(-width / 2, -height / 2, 0); // Adjust for WebGL centering
      for (let l = 0; l < layers; l++) {
        beginShape();
        for (let p of this.points[l]) {
          vertex(p.pos.x, p.pos.y, p.pos.z);
        }
        endShape(CLOSE);
      }
      pop();
    } else {
      push();
      for (let l = 0; l < layers; l++) {
        beginShape();
        for (let p of this.points[l]) {
          vertex(p.pos.x, p.pos.y);
        }
        endShape(CLOSE);
      }
      pop();
    }
  }
}

class Point {
  constructor(x, y, z, angle) {
    this.pos = createVector(x, y, z);
    this.a;
    this.spd = spd;
    this.v = p5.Vector.fromAngle(this.a);
    this.v.mult(spd);
  }

  move() {
    this.a =
      map(
        noise(
          this.pos.x * noiseScale,
          this.pos.y * noiseScale,
          frameCount * noiseScale
        ),
        0.2,
        0.8,
        0,
        TWO_PI
      ) * mult;
    this.v = p5.Vector.fromAngle(this.a);
    this.v.setMag(this.spd);

    if (this.pos.x < wall.x || this.pos.x > wall.x + wall.w) {
      this.v.x *= -1;
    }
    if (this.pos.y < wall.y || this.pos.y > wall.y + wall.h) {
      this.v.y *= -1;
    }
    this.pos.add(this.v);
  }
}
