init_functions = () => {
    
    isset = (...params) => {

        for(element in params) {
    
            if(element == undefined)
                return false
            
            return true
        }

    }
}

exports.init_functions = init_functions