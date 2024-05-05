const mongoose = require("mongoose");

const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dark_store");

        console.log("Sucess conection to dark_store db");
    } catch (error){
        console.log(error);
        throw new Error("No connection to the DB")
    }
}

module.exports = connection