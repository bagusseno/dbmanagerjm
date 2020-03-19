init_functions = () => {
    
    isset = (...params) => {

        for(element in params) {
    
            if(element == undefined || element == null)
                return false
            
            return true
        }

    }
}

exports.init_functions = init_functions