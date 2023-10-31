const mongoose = require("mongoose")
const detallePrestamoSchema = new mongoose.Schema({
    prestamo : { type : mongoose.Schema.Types.ObjectId, ref: 'Prestamo'},
    fecha_pedido : Date,
    fecha_limite : Date,
    en_casa : Boolean,
    direccion : String,
    fecha_devolucion : Date,
    ejemplar : { type : mongoose.Schema.Types.ObjectId, ref: 'Ejemplar'}
});

module.exports = mongoose.model("DetallePrestamo", detallePrestamoSchema);