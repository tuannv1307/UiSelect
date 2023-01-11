const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");
const data = require("./data.js");

const app = express();
const port = 3005;
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/options", (req, res) => {
  res.send(data.dataUiSelect);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
