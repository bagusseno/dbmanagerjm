'use strict'

exports.auth_user = (req, res, next) => {

    if(req.session.current_user == null)
        res.redirect('/login')
    else
        next()
}

exports.restrict_logged_in_user = (req, res, next) => {

    if(req.session.current_user != null)
        res.redirect('/dashboard')
    else
        next()
}