const mongoose = require("mongoose")
const detalleCompraSchema = new mongoose.Schema({
    compra : { type : mongoose.Schema.Types.ObjectId, ref: 'Compra'},
    fecha_compra : String,
    precio : String,
    ejemplar : { type : mongoose.Schema.Types.ObjectId, ref: 'Ejemplar'}
});

module.exports = mongoose.model("DetalleCompra", detalleCompraSchema);