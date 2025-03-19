function initializeBlobs(width, height) {
  r = height / 18; // max size for the blob should be 16 x 18"

  let centerX = width / 2;
  let centerY = height / 2;

  let maxRadiusX = width / 2;
  let maxRadiusY = height / 2;

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
    // Ensure the blob is within the boundaries
    if (x - r >= 0 && x + r <= width && y - r >= 0 && y + r <= height) {
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
}
