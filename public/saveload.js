function storeSVG() {
  save("blob.svg");
}

function saveVariables() {
  let presetName = prompt("Enter the name for the preset:");
  if (presetName) {
    let blob = new Blob([JSON.stringify(params, null, 2)], {
      type: "application/json",
    });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = presetName + ".json";
    a.click();
    URL.revokeObjectURL(url);
    console.log(`Variables saved as ${presetName}.json`);
  }
}

function loadVariables() {
  let input = createFileInput(handleFile);
  input.position(width / 2, wall.h + wall.y + 90);
}

function handleFile(file) {
  if (file.name.endsWith(".json")) {
    let variables = JSON.parse(file.data);
    Object.assign(params, variables);
    console.log(`Variables loaded from ${file.name}`);
    frameCount = 0;
    initializeWall();
    initializeBlobs();
    redraw();
  } else {
    console.log("Not a valid JSON file");
  }
}

// Fetch the list of JSON files from the /params directory
async function fetchJSONFiles() {
  try {
    const response = await fetch("/list-json-files");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const files = await response.json();
    console.log(files);
    return files.filter((file) => file.endsWith(".json"));
  } catch (error) {
    console.error("Error fetching JSON files:", error);
    return [];
  }
}

// Create a dropdown menu and populate it with the list of JSON files
async function createDropdown() {
  const files = await fetchJSONFiles();
  const dropdown = createSelect();
  dropdown.position(width / 2, height + 120);
  dropdown.option("Select a preset");
  files.forEach((file) => dropdown.option(file));
  dropdown.changed(() => {
    const selectedFile = dropdown.value();
    if (selectedFile !== "Select a preset") {
      loadJSONFile(`/params/${selectedFile}`);
    }
  });
}

// Load the selected JSON file
function loadJSONFile(filePath) {
  loadJSON(filePath, (data) => {
    Object.assign(params, data);
    console.log(`Variables loaded from ${filePath}`);
    frameCount = 0;
    blobs = [];
    show();
  });
}

function resetSim() {
  t = 0;
  blobs = [];
  angleMode(DEGREES);
  initializeBlobs();
  redraw();
  loop();
}
