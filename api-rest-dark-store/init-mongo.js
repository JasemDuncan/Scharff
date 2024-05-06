// init-mongo.js

// Conéctate a la instancia de MongoDB
var connection = new Mongo();
var db = connection.getDB("dark_store");

// Crea la colección "products" si no existe
db.createCollection("products");
