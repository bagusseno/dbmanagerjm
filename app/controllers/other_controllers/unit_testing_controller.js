'use strict'

exports.show = (req, res) => {    
    
    res.render('auth/login', {base_url : config.hostname});

}