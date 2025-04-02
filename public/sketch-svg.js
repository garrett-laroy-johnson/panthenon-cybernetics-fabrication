let wall;
let blobs = [];
let controls = {};
let paramRanges; // Will store the JSON data with min/max/step

function preload() {
  // Loads the JSON before setup() runs
  paramRanges = loadJSON("paramRanges.json");
}

function setup() {
  let w = windowWidth;
  let h = (w * 9) / 44;
  canvas = createCanvas(w, h, SVG);
  noFill();
  angleMode(DEGREES);
  noiseSeed(params.nSeed);
  randomSeed(params.rSeed);
  createInterface();

  show();
}

function createInterface() {
  // Create a button to save the SVG
  let saveButton = createButton("Save SVG");
  saveButton.position(10, 10);
  saveButton.mousePressed(storeSVG);

  // Create a button to save global variables as JSON
  let saveVarsButton = createButton("Save Variables");
  saveVarsButton.position(10, 40);
  saveVarsButton.mousePressed(saveVariables);

  // Create a button to load global variables from JSON
  let resetButton = createButton("Reset Sim");
  resetButton.position(10, 70);
  resetButton.mousePressed(resetSim);

  // Create the dropdown menu
  createDropdown();

  // Create sliders or input fields for each parameter in the params object
  let yOffset = 100; // Start position for the parameter controls
  for (let key in params) {
    createParameterControl(key, params[key], yOffset);
    yOffset += 40; // Adjust spacing between controls
  }
}

function createParameterControl(key, value, yOffset) {
  let label = createDiv(`${key}:`);
  label.position(10, yOffset);
  label.style("color", "white");

  // If we have numeric ranges defined for this key in paramRanges, use them
  if (typeof value === "number") {
    let rangeData = paramRanges[key] || {};
    let minVal = rangeData.min ?? (value > 1 ? 0 : 0.002);
    let maxVal = rangeData.max ?? (value > 1 ? value * 2 : 0.2);
    let stepVal = rangeData.step ?? (value > 1 ? 1 : 0.002);

    let slider = createSlider(minVal, maxVal, value, stepVal);
    slider.position(100, yOffset);
    slider.style("width", "200px");

    let valueLabel = createDiv(`${value}`);
    valueLabel.position(310, yOffset);
    valueLabel.style("color", "white");

    slider.input(() => {
      params[key] = slider.value();
      valueLabel.html(`${slider.value()}`);
    });

    controls[key] = { slider, valueLabel };
  } else if (typeof value === "string") {
    let input = createInput(value);
    input.position(100, yOffset);
    input.style("width", "200px");
    input.input(() => {
      params[key] = input.value();
    });

    controls[key] = { input };
  }
}

// Call this after loading JSON to refresh your UI:
function updateParameterControls() {
  for (let key in params) {
    if (controls[key]?.slider) {
      controls[key].slider.value(params[key]);
      controls[key].valueLabel.html(`${params[key]}`);
    } else if (controls[key]?.input) {
      controls[key].input.value(params[key]);
    }
  }
}

// ...in your loadJSONFile callback...
function loadJSONFile(filePath) {
  loadJSON(filePath, (data) => {
    Object.assign(params, data);
    updateParameterControls(); // Update UI
    show();
  });
}

function show() {
  initializeBlobs(width, height);
  background(0);
  for (let i = 0; i < params.timestep; i++) {
    for (let b of blobs) {
      b.move();
    }
  }
  for (let b of blobs) {
    b.show();
  }
}

function resetSim() {
  t = 0;
  blobs = [];
  angleMode(DEGREES);
  noiseSeed(params.nSeed);
  randomSeed(params.rSeed);
  initializeBlobs();
  show();
  //loop();
}
