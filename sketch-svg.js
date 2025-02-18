let blobs = []; // holds geometries
let r; // radius of the blob/ determined in initializeBlobs relative to wall / pixel size
let wall;
let t = 0;

function setup() {
  canvas = createCanvas(2544, 1352, SVG);
  angleMode(DEGREES);
  noiseSeed(params.nSeed);
  randomSeed(params.rSeed);
  initializeWall();
  initializeBlobs();

  // Create a button to save the SVG
  let saveButton = createButton("Save SVG");
  saveButton.position(width / 2, wall.h + wall.y);
  saveButton.mousePressed(saveSVG);

  // Create a button to load global variables from JSON
  let resetButton = createButton("Reset Sim");
  resetButton.position(saveButton.x + saveButton.width, wall.h + wall.y);
  resetButton.mousePressed(resetSim);
}

function draw() {
  angleMode(RADIANS);
  drawWall();

  for (let b of blobs) {
    noFill();
    b.move();
    b.show();
  }

  if (t > params.timestep) {
    for (let b of blobs) {
      noFill();
      b.show();
    }
    noLoop();
  }
  push();
  fill(255);
  text(
    "step " + (t - 1) + "/" + params.timestep + " | numBlobs: " + blobs.length,
    width / 2,
    wall.y - 10
  );

  pop();
  t++;
}

function resetSim() {
  t = 0;
  blobs = [];
  angleMode(DEGREES);
  initializeBlobs();

  redraw();
  loop();
}

function initializeBlobs() {
  r = wall.h / 18; // max size for the blob should be 16 x 18"

  let centerX = wall.x + wall.w / 2;
  let centerY = wall.y + wall.h / 2;

  let maxRadiusX = wall.w / 2;
  let maxRadiusY = wall.h / 2;

  let radiusIncrementX = params.radiusIncrement * maxRadiusX;
  let radiusIncrementY = params.radiusIncrement * maxRadiusY;

  let radiusX = 0;
  let radiusY = 0;

  let angle = 0;
  let totalBlobs = 0;

  while (radiusX < maxRadiusX && totalBlobs < params.maxBlobs) {
    let x = radiusX * cos(angle) + centerX;
    let y = radiusY * sin(angle) + centerY;
    x += random(-params.maxJitter, params.maxJitter);
    y += random(-params.maxJitter, params.maxJitter);
    // Ensure the blob is within the wall boundaries
    if (
      x - r >= wall.x &&
      x + r <= wall.x + wall.w &&
      y - r >= wall.y &&
      y + r <= wall.y + wall.h
    ) {
      let overlap = false;
      for (let b of blobs) {
        let d = dist(x, y, b.center.x, b.center.y);
        if (d < r * 2) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        let b = new Blobby(x, y, r, params.res);
        blobs.push(b);
        totalBlobs++;
      }
    }

    angle += params.angleIncrement;
    radiusX += radiusIncrementX * (params.angleIncrement / 360); // Increase radius gradually to create a spiral
    radiusY += radiusIncrementY * (params.angleIncrement / 360); // Increase radius gradually to create a spiral
  }

  console.log(blobs);
}

function drawWall() {
  background(128);

  push();
  noFill();
  rect(wall.x, wall.y, wall.w, wall.h);
  pop();
  strokeWeight(1);
}

function initializeWall() {
  wall = {
    // width: 44", height: 9.25"
    x: 0,
    w: width,
    h: width / 4.75,
    y: height / 4,
  };
}
