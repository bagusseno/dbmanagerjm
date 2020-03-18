require('./libs/functions_lib.js').init_functions()

var path = require('path')
var express = require('express')
var body_parser = require('body-parser')
var flash = require('express-flash')
var session = require('express-session')
var middlewares = require('./configs/middlewares.js')
var user_session = require('./libs/user_session_lib.js')

app = express()
port = 354
config = require('./configs/app_configs.js').config.development
multer = require('multer')({
    dest: './data/uploads'
})

// app middlewares
app.use(body_parser.urlencoded())
app.use(body_parser.json())
app.use(express.static('statics'))
app.use(flash())
app.use(session({secret: 'secret'}))
app.use(user_session.user_session)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// route middlewares
// app.use('/dashboard', middlewares.auth_user)
app.use('/logout', middlewares.auth_user)

app.use('/login', middlewares.restrict_logged_in_user)
app.use('/register', middlewares.restrict_logged_in_user)

// configurations
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))

app.listen(port)

var routes = require('./configs/routes.js')
routes(app)
