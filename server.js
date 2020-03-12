require('./libs/functions_lib.js').init_functions()

var path = require('path')
var express = require('express')
var body_parser = require('body-parser')
var flash = require('express-flash')
var session = require('express-session')
var middlewares = require('./configs/middlewares.js')

app = express()
port = 3000
config = require('./configs/app_configs.js').config.development

// app middlewares
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())
app.use(express.static('statics'))
app.use(flash())
app.use(session({secret: 'secret'}))

// route middlewares
app.use('/dashboard', middlewares.auth_user)
app.use('/logout', middlewares.auth_user)

app.use('/login', middlewares.restrict_logged_in_user)
app.use('/register', middlewares.restrict_logged_in_user)

// configurations
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))

app.listen(port)

var routes = require('./configs/routes.js')
routes(app)
