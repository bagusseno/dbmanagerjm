'use strict'

var fs = require('fs')
var path = require('path')
var file_extension = '.html'

exports.render = (res, file_name, data = null) => {

    var file_path = path.join(__dirname, '..', 'views', file_name + file_extension)
        
    fs.readFile(file_path, 'utf-8', (err, content) => {
        
        content = content.toString()

        if(data != null)
            for(var key in data) {

                content = content.replace(new RegExp('{' + key + '}'), data[key])
            }

        res.send(content)            
    })
}