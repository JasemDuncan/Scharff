//dependency import
const connection = require("./database/connection");
const express =require("express");
const cors = require("cors");
//welcome message
console.log("API NODE for Dark Store loaded")
//db conection
connection();

//create node server
const app = express();
const port = 3900;
//configure cors
app.use(cors());

//convert data body to js objects
app.use(express.json()); //Receive data with content-type app/json
app.use(express.urlencoded({extended: true})); //form-urlencoded

//routes
const routes_product = require("./routes/product");

//load routes
app.use("/api",routes_product);

// app.get("/probando",(req, res)=>{
//     console.log("Endpoint loaded");
//     return res.status(200).send({
//         articles: "product 1",
//         price:"100"
//     });
// });

//server listening for http request
app.listen(port, ()=>{
    console.log("Server running in port:"+port);
});