const mongoose = require("mongoose")
const prestamoSchema = new mongoose.Schema({
    usuario : { type : mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    bibliotecario : { type : mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = moongose.model("prestamo", prestamoSchema);