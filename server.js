// app configs and custom functions
config = require('./configs/app_configs.js').config.development
require('./libs/functions_lib.js').init_functions()

// dependencies
var path = require('path')
var express = require('express')
var body_parser = require('body-parser')
var flash = require('express-flash')
var session = require('express-session')
var io = require('socket.io')(config.socketio_port)
var user_auth = require('./middlewares/user_auth')
var user_session = require('./middlewares/user_session')
var api = require('./middlewares/api')

// global
app = express()
logger = require('./libs/logger_lib')
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
app.use(api.api)
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route middlewares
app.use('/logout', user_auth.auth_user)
app.use('/login', user_auth.restrict_logged_in_user)
app.use('/register', user_auth.restrict_logged_in_user)

// // express configs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))
require('./configs/routes.js')(app)

// sockets
io.on('connection', (socket) => {

    socket.on('new_presence_trigger', (presence_data) => {

        socket.emit('new_presence', presence_data)
    })
})

app.listen(354)