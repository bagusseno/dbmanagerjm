'use strict';

exports.api = (req, res, next) => {

    var api = {}

    api.response = {
        status: null,
        errs: [],
        msg: [],
        responses: {}
    };

    api.err_schema = {
        err_code: null,
        msg: null
    }

    api.auto_false_if_err = false

    api.add_err = (err_code, msg = null) => {

        var new_error = api.err_schema;
        new_error.err_code = err_code
        new_error.msg = msg

        api.response.errs.push(new_error)

        // log err
        logger.err(msg, req)

        if(api.auto_false_if_err)
            response.set_status(false)
    }

    api.die = (err_code, msg = null) => {

        api.add_err(err_code, msg)

        res.send(JSON.stringify(api.response))
    }

    api.add_msg = (msg) => {

        api.response.msg.push(msg);
    }

    api.set_status = (status) => {

        api.response.status = status
    }

    api.send_json = () => {

        res.send(JSON.stringify(api.response))
    }

    res.api = api

    next()
}