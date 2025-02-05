// field params
let noiseScale = 0.0015; // scale of the noise
let mult = 3; // multiplier for the noise
//let spd = 1; // speed of the blob points

//blob params
let maxBlobs = 40; // Limit the number of blobs to prevent excessive calculations

let angleIncrement = 30; // Angle increment for the spiral
let radiusIncrement = 0.2; // Radius increment for the spiral, 0 to 1, 1 being the full radius of the wall

let layers = 5;
let res = 50; // number of points in the blob
let heightDist = 10; // distance between layers
let r = 15;

let maxJitter = 10; // jitter for the blob points

let renderer = "2d"; // current renderer mode
let mode = "online"; // "online" or "offline"
// if mode is offline then timestep

let timestep = 25; // number of steps to run simulate before displaying

let nSeed = 52;
