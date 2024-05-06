const validator = require("validator");

const validateProduct = (parameters) => {
  
    let validate_name = !validator.isEmpty(parameters.name) &&
        validator.isLength(parameters.name,{min:1, max:100});
  

    if(!validate_name ){
        throw new Error("No data validation");
    }
}

module.exports = {
    validateProduct
}