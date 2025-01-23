function createCustomCanvas() {
  if (typeof canvas !== "undefined") {
    canvas.remove();
  }

  if (renderer === "2d") {
    canvas = createCanvas(windowWidth, windowHeight, SVG);
  } else if (renderer === "webgl") {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  }
  angleMode(DEGREES);
  stroke(255);
  noFill();
}

function toggleRenderer() {
  if (renderer === "2d") {
    renderer = "webgl";
  } else {
    renderer = "2d";
  }
}

function displayText() {
  push();
  fill(255);
  if (renderer === "webgl") {
    push();
    translate(-width / 2, -height / 2, 0); // Adjust for WebGL centering
    text("Press 't' to toggle renderer", 10, 20, 0);
    pop();
  } else {
    text("Press 't' to toggle renderer", 10, 20);
  }
  pop();
}

function keyPressed() {
  if (key === "t" || key === "T") {
    toggleRenderer();
    createCustomCanvas();
    //initializeBlobs();
  }
}
