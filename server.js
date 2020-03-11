var express = require("express");
var body_parser = require("body-parser");

app = express();
port = 3002;

app.get("/", function(req, res) {
  res.send("TEST");
});

app.listen(port);

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

var routes = require("./app/routes/routes.js");
routes(app);
