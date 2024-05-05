const {validateProduct} = require("../helpers/validateProduct");
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path")

const create = (req,res) => {
    //Retrieve fields
    let parameters = req.body;    

    //Validate data with validator
    try {
        validateProduct( parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            menssage: "Missing parameter to send"
        })
    }    
    //Create object to save
    const product = new Product(parameters);
    //Assign values to object according to the model
    
    //Save
    product
        .save()
        .then(productSave =>{
            return res.status(200).json({
                message: "Success",
                product: productSave,
                message: "Product saved."    
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: "error",
                menssage: "Product was not saved."
            })
        })                                     
}

const list = (req, res) => {    
    let query = 
        Product
        .find({});
        if(req.params.last){ query.limit(req.params.last)}
        
        query
        .sort({date: -1})
        .then(products => {
            if (!products || products.length === 0) {
                return res.status(404).json({
                    status: "error",
                    message: "No products were found"
                });
            }
            return res.status(200).send({
                status: "Success",
                url_param: req.params.last,
                count: products.length,
                products
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "An error occurred while fetching products"
            });
        });
};

const one = (req, res) => {
    //Pass the Id by the url
    let id = req.params.id;

    //Look for the product with the specified ID
    Product
        .findById(id)
        .then(product => {
            //If the product doesn't exist, return an error
            if (!product) {
                return res.status(404).json({
                    status: "error",
                    message: "No product was found"
                });
            }
            //Return the found product
            return res.status(200).json({
                status: "Success",
                product
            });
        })
        .catch(error => {
            //Handle any errors that may occur
            return res.status(500).json({
                status: "error",
                message: "An error occurred while fetching the product"
            });
        });
};

const deleteOne = (req, res) => {
    let productId = req.params.id;

    Product
        .findOneAndDelete({ _id: productId })
        .then(deleteProduct => {
            if (!deleteProduct) {
                return res.status(404).json({
                    status: "error",
                    message: "Product not found"
                });
            }

            return res.status(200).json({
                status: "Success",
                product: deleteProduct,
                message: "Product deleted"
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Error while deleting product"
            });
        });
};

const update = (req, res) => {
    //retrieve product id to update
    let productId =  req.params.id;

    //retrieve date from body
    let parameters = req.body;
    //validate
    try {
        validateProduct( parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            menssage: "Missing parameter to send"
        })
    }    
    // Update
    Product
        .findOneAndUpdate({ _id: productId }, req.body, { new: true })
        .then(productUpdated => {
            if (!productUpdated) {
                return res.status(500).json({
                    status: "error",
                    message: "Error while updating product",
                });
            }
            // Response
            return res.status(200).json({
                status: "Success",
                product: productUpdated,
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Error while updating product",
            });
        });
}

const uploadImage = (req, res) => {
    // Retrieve image
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            message: "Invalid request"
        });
    }

    // Retrieve Name 
    let file = req.file.originalname;

    // Retrieve extension
    let splitFile = file.split(".");
    let fileExtension = splitFile[splitFile.length - 1];

    // Validate extension
    if (fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg" && fileExtension !== "gif") {
        // Delete file
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                message: "Invalid file"
            });
        });
    } else {


        //retrieve product id to update
        let productId =  req.params.id;

        // Update
        Product
            .findOneAndUpdate({ _id: productId }, {image: req.file.originalname}, { new: true })
            .then(productUpdated => {
                if (!productUpdated) {
                    return res.status(500).json({
                        status: "error",
                        message: "Error while updating product",
                    });
                }
                // Response
                return res.status(200).json({
                    status: "Success",
                    product: productUpdated,
                    fileDetails: req.file
                });
            })
            .catch(error => {
                return res.status(500).json({
                    status: "error",
                    message: "Error while updating product",
                });
            });
    }
};

const image = (req, res) => {
    let fileData = req.params.file;
    console.log(req.params);
    console.log(fileData);
    let allPath = "./images/products/"+fileData;
    console.log(allPath)

    fs.stat(allPath, (error, exists)=> {
        if(exists){
            return res.sendFile(path.resolve(allPath));
        } else {
            return res.status(404).json({
                status: "error",
                message: "Image does not exists"
            })
        }
    });

}



module.exports = {
    create,
    list,
    one,
    deleteOne,
    update,
    uploadImage,
    image

}