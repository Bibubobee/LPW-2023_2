const mongoose = require("mongoose")
const libroGeneroSchema = new mongoose.Schema({
	libro : { type : mongoose.Schema.Types.ObjectId, ref: 'Libro'},
    genero : { type : mongoose.Schema.Types.ObjectId, ref: 'Genero'},

});

module.exports = mongoose.model("LibroGenero", libroGeneroSchema);