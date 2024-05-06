//dependency import
const connection = require("./database/connection");
const express =require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
//welcome message
console.log("API NODE for Dark Store loaded")
//db conection
connection();

//create node server
const app = express();
const port = 443;
//configure cors
app.use(cors());

//convert data body to js objects
app.use(express.json()); //Receive data with content-type app/json
app.use(express.urlencoded({extended: true})); //form-urlencoded

//routes
const routes_product = require("./routes/product");

//load routes
app.use("/api",routes_product);

// Configurar opciones para HTTPS
const options = {
    key: fs.readFileSync("server.key"),      // Ruta a tu clave privada
    cert: fs.readFileSync("server.cert")     // Ruta a tu certificado
  };
  
  // Crear servidor HTTPS
  const server = https.createServer(options, app);


//server listening for http request
server.listen(port, ()=>{
    console.log("Server running in port:"+port);
});