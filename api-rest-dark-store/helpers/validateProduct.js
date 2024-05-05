const validator = require("validator");

const validateProduct = (parameters) => {
  
    let validate_name = !validator.isEmpty(parameters.name) &&
        validator.isLength(parameters.name,{min:5, max:100});
    let validate_description= !validator.isEmpty(parameters.description);

    if(!validate_name || !validate_description){
        throw new Error("No data validation");
    }
}

module.exports = {
    validateProduct
}