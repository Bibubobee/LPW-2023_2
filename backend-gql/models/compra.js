const mongoose = require("mongoose")
const compraSchema = new mongoose.Schema({
    bibliotecario : { type : mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model("compra", compraSchema);