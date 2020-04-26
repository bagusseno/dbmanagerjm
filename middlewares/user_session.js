'use strict'

var current_user_schema = {
    id: (config.current_env == 'development' ? 1 : null),
    email: null,
    photo: "default.jpeg"
}

exports.user_session = (req, res, next) => {

    req.get_current_user = () => {

        if (req.session.current_user == null)
            return current_user_schema
        else
            return req.session.current_user
    }

    next()
}