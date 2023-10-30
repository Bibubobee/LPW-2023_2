const mongoose = require("mongoose")
const libroSchema = new mongoose.Schema({
	nombre: String,
	anno: Number,
    copias: Number,
	autor: String,
	sinopsis: String,
	foto: String

});

module.exports = mongoose.model("Libro", libroSchema);