const mongoose = require("mongoose")
const ejemplarSchema = new mongoose.Schema({
    libro : { type : mongoose.Schema.Types.ObjectId, ref: 'Libro'}
});

module.exports = mongoose.model("ejemplar", ejemplarSchema);