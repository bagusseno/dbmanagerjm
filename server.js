var path = require('path')

var express = require('express')
var body_parser = require('body-parser')

app = express();
port = 3000;

app.get("/", function(req, res) {
  res.send("TEST");
});

app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))

app.listen(port)

var routes = require('./app/routes/routes.js')
routes(app)
