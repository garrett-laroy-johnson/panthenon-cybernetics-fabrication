const express = require("express");
const path = require("path");
const fs = require("fs");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const port = 3000;

// Create a livereload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

// Use connect-livereload middleware
app.use(connectLivereload());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Serve JSON files from the "/params" directory
app.use("/params", express.static(path.join(__dirname, "params")));

// Endpoint to list JSON files in the "/params" directory
app.get("/list-json-files", (req, res) => {
  const paramsDir = path.join(__dirname, "params");
  fs.readdir(paramsDir, (err, files) => {
    if (err) {
      res.status(500).send("Error reading directory");
      return;
    }
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    res.json(jsonFiles);
  });
});

// Notify livereload server when files change
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
