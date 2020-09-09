const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const app = express();
const PORT = process.env.PORT || 4000;
const env = process.env.ENV || 'development';
const layout = require("express-layout");
var apiRoute = require('./routes/api');
const dotenv = require('dotenv');
dotenv.config();
// var appRoute = require('./routes/route');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
const DIR = 'client/build';

console.log(process.env.UAPI);


// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

const middlewares = [
  // helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];
app.use(middlewares);

app.use(express.static(DIR));

// routes Files
app.use("/api/v1/", apiRoute);

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, DIR, '/index.html'));
});

// app.use(express.static(path.join(__dirname, "..", "client/build")));
// app.use(express.static("public"));
// app.use('/api/v1/', apiRoute);

app.all('*',(req, res, next) => {
  res.status(404).json({message:"Route not found"});
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

const server = app.listen(PORT, () => {
  const host = server.address().address || 'localhost';
  const port = server.address().port;
  console.log(`Server listening at PORT ${port} and on ${env} mode`);
});

module.exports= app;
module.exports.port= PORT;