const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");

const app = express();
const port = 3005;
app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
