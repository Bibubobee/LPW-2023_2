const mongoose = require("mongoose")
const solicitudSchema = new mongoose.Schema({
    usuario : { type : mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    libro : { type : mongoose.Schema.Types.ObjectId, ref: 'Libro'},
    estado: {
        type: String,
        default: 'pendiente'
    }
});

module.exports = mongoose.model("Solicitud", solicitudSchema);