// field params
let noiseScale = 0.0015; // scale of the noise
let mult = 3; // multiplier for the noise
let nSeed = 55;

//let spd = 1; // speed of the blob points

//blob placement
let maxBlobs = 40; // Limit the number of blobs to prevent excessive calculations
let angleIncrement = 40; // Angle increment for the spiral
let radiusIncrement = 0.15; // Radius increment for the spiral, 0 to 1, 1 being the full radius of the wall
let maxJitter = 70; // jitter for the blob points

//blob params
let layers = 5;
let res = 100; // number of points in the blob
let heightDist = 10; // distance between layers
let r; // radius of the blob/ determined in initializeBlobs relative to wall / pixel size

let timestep = 35; // number of steps to run simulate before displaying
