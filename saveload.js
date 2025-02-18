function saveSVG() {
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
    t = 0;
    angleMode(DEGREES);
    blobs = [];
    initializeWall();
    initializeBlobs();
    redraw();
  } else {
    console.log("Not a valid JSON file");
  }
}
