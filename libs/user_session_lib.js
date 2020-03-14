'use strict'

var current_user_schema = {
    email: null,
    photo: null
}

exports.user_session = (req, res, next) => {

    req.get_current_user = () => {

        if(req.session.current_user == null)
            return current_user_schema
        else
            return req.session.current_user
    }

    next()
}