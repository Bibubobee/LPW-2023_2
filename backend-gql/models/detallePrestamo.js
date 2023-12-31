const mongoose = require("mongoose")
const detallePrestamoSchema = new mongoose.Schema({
    prestamo : { type : mongoose.Schema.Types.ObjectId, ref: 'Prestamo'},
    fecha_pedido : String,
    fecha_limite : String,
    en_casa : Boolean,
    direccion : String,
    fecha_devolucion : String,
    ejemplar : String
});

module.exports = mongoose.model("DetallePrestamo", detallePrestamoSchema);