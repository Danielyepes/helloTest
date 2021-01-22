//Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define a schema
var Service = new Schema({
    nombre: String,
    description: String,
    codigo: String,
    valor: Number,

},
    { versionKey: false },
    { collection: 'services' });


module.exports = mongoose.model('services', Service);