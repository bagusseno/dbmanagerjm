'use strict'

var fs = require('fs')
var path = require('path')

var append_log = (msg, req = null) => {

    // prepare message
    msg += ' [' + Date() + ']'

    if(req != null)
        msg += ' [IP_ADDRESS: ' + req.connection.remoteAddress + ']'

    fs.appendFile(path.join(__dirname, '../', '/data/logs/log'), '\n' + msg, 'utf8', (err) => {

        console.log(err);  
    })
}

exports.info = async (msg, req = null) => {

    append_log('INFO: ' + msg, req)
}

exports.warn = async (msg, req = null) => {

    append_log('WARNING: ' + msg, req)
}

exports.err = async (msg, req = null) => {

    append_log('ERROR: ' + msg, req)
}

exports.debug = async (msg, req = null) => {

    append_log('DEBUG: ' + msg, req)
}