let wall;
let blobs = [];

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
  // Create a label for the parameter
  let label = createDiv(`${key}:`);
  label.position(10, yOffset);
  label.style("color", "white"); // Set text color to white

  // Create a slider or input field based on the type of value
  if (typeof value === "number") {
    let slider = createSlider(
      value > 1 ? 0 : 0.001, // Min value (adjust for small numbers)
      value > 1 ? value * 2 : 0.1, // Max value (adjust for small numbers)
      value, // Initial value
      value > 1 ? 1 : 0.001 // Step size
    );
    slider.position(100, yOffset);
    slider.style("width", "200px");

    // Create a dynamic value label next to the slider
    let valueLabel = createDiv(`${value}`);
    valueLabel.position(310, yOffset);
    valueLabel.style("color", "white"); // Set text color to white

    // Update the parameter value and the value label when the slider changes
    slider.input(() => {
      params[key] = slider.value();
      valueLabel.html(`${slider.value()}`); // Update the value label
      console.log(`${key} updated to:`, params[key]);
    });
  } else if (typeof value === "string") {
    let input = createInput(value);
    input.position(100, yOffset);
    input.style("width", "200px");

    // Update the parameter value when the input changes
    input.input(() => {
      params[key] = input.value();
      console.log(`${key} updated to:`, params[key]);
    });
  }
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
  initializeBlobs();
  show();
  //loop();
}
