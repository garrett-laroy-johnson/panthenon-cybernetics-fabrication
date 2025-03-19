// Global parameters in JSON
const params = {
  noiseScale: 0.002, // scale of the noise
  mult: 3, // multiplier for the noise
  nSeed: 19,
  zMult: 2, // multiplier for the z coordinate of the noise // distortion from top to bottom
  timestep: 40, // number of steps to run simulate before displaying
  maxBlobs: 31, // Limit the number of blobs to prevent excessive calculations
  angleIncrement: 20, // Angle increment for the spiral
  radiusIncrement: 0.1, // Radius increment for the spiral, 0 to 1, 1 being the full radius of the wall
  maxJitter: 70, // jitter for the blob points
  rSeed: 25, // random seed for the blob placement
  layers: 5,
  zHeight: 10,
  res: 100, // number of points in the blob
};
