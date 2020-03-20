init_functions = () => {
    
    isset = (...params) => {
        
        for(var key in params) {
                       
            if(params[key] == undefined || params[key] == null)
                return false
            
            return true
        }

    }
}

exports.init_functions = init_functions