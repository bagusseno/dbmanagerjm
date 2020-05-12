init_functions = () => {
    
    isset = (...params) => {
        
        for(var key in params) {
                       
            if(params[key] == undefined || params[key] == null)
                return false

            if(params[key].length == 0)
                return false
            
            return true
        }

    }

    groupBy = (xs, key) => {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
}

exports.init_functions = init_functions