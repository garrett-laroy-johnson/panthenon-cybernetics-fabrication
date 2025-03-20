function initializeBlobs(width, height) {
  blobs = []; // Clear existing blobs
  r = height / 18; // Max size for the blob should be 16 x 18"

  for (let letter of phrase) {
    let points = [];
    // Use textToPoints to generate points for the current letter
    points = fontToPoints(letter, xOffset, yOffset, params.fontSize, font);
    console.log(points);
    // Add the blob to the blobs array
    if (points.length > 0) {
      let b = new Blobby(points, r, params.res);
      blobs.push(b);
    }
    // Increment the horizontal offset for the next letter
    xOffset += params.fontSize * 0.6; // Adjust spacing between letters
  }
}

// Helper function to convert text to points
function fontToPoints(letter, x, y, fontSize, font) {
  textFont(font);
  textSize(fontSize);
  let points = font.textToPoints(letter, x, y, fontSize, {
    sampleFactor: 0.1, // Adjust for point density
    simplifyThreshold: 0, // No simplification
  });

  console.log(points);
  return points;
}
