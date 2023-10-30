const mongoose = require("mongoose")
const generoSchema = new mongoose.Schema({
	nombre: String,

});

module.exports = mongoose.model("Genero", generoSchema);