const mongoose = require("mongoose")
const usuarioSchema = new mongoose.Schema({
	email: String,
	pass: String,
	nombre:String,
	rut: String,
	telefono: String, //no vamos a operar asi que mejor asi que como un int
	foto: String

});

module.exports = mongoose.model("usuario", usuarioSchema);