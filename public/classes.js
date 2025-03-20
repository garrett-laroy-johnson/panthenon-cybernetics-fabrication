class Blobby {
  constructor(points) {
    this.points = points;
    this.r = r;
    this.rDist = this.r / params.layers;
    this.spawn();
  }

  spawn() {
    for (let i = 0; i < this.points.length; i++) {
      let point = new Point(this.points[i]);
      this.points[i] = point;
    }
  }
  move() {
    //for (let l = 0; l < params.layers; l++) {
    for (let p of this.points) {
      p.move();
    }
  }

  show() {
    push();
    stroke(255);
    strokeWeight(1);
    // for (let l = 0; l < params.layers; l++) {
    beginShape();
    for (let p of this.points) {
      vertex(p.pos.x, p.pos.y);
    }
    endShape(CLOSE);
    //   }
    pop();
  }
}

class Point {
  constructor(point) {
    this.pos = createVector(point.x, point.y, point.z);
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
