class Blob {
  constructor(x, y) {
    this.center = createVector(x, y);
    this.points = [];
    this.layers = 0;
    this.spawn();
  }

  spawn() {
    console.log("spawn");
    this.points[this.layers] = [];
    let x, y, z;
    if (this.layers == 0) {
      x = this.center.x;
      y = this.center.y;
      z = this.layers * heightDist; // z is the layer times distance
    } else {
      let xSum = 0;
      let ySum = 0;
      //console.log(this.points[this.layers - 1]);
      for (let p of this.points[this.layers - 1]) {
        xSum += p.pos.x;

        ySum += p.pos.y;
      }
      x = xSum / res;
      y = ySum / res;
    }
    for (let a = 0; a < TWO_PI; a += TWO_PI / res) {
      let v = new Point(x, y, z, a);
      this.points[this.layers].push(v);
    }

    this.layers++;
  }

  move() {
    if (frameCount % 200 == 0) {
      this.spawn();
    }
    for (let l = 0; l < this.layers; l++) {
      for (let p of this.points[l]) {
        p.move();
      }
    }
  }

  show() {
    if (renderer === "webgl") {
      push();
      translate(-width / 2, -height / 2, 0); // Adjust for WebGL centering
      for (let l = 0; l < this.layers; l++) {
        beginShape();
        for (let p of this.points[l]) {
          vertex(p.pos.x, p.pos.y, p.pos.z);
        }
        endShape(CLOSE);
      }
      pop();
    } else {
      push();
      for (let l = 0; l < this.layers; l++) {
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
    this.radiate = p5.Vector.fromAngle(angle, radiateMag);
    this.rad = radiateMag;
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
          this.pos.z * noiseScale
        ),
        0.2,
        0.8,
        0,
        TWO_PI
      ) * mult;
    this.v = p5.Vector.fromAngle(this.a);
    this.v.setMag(this.spd);
    // adjust magnitude;
    this.radiate.setMag(this.rad);

    this.rad -= 0.0001;
    if (this.rad < 0) {
      this.rad = 0;
    }
    this.v.add(this.radiate);

    this.v.div(2);
    if (this.pos.x < wall.x || this.pos.x > wall.x + wall.w) {
      this.v.x *= -1;
    }
    if (this.pos.y < wall.y || this.pos.y > wall.y + wall.h) {
      this.v.y *= -1;
    }
    this.pos.add(this.v);
  }
}
