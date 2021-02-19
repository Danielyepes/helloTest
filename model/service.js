//Require Mongoose
const { Double } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de calificación
var Calificacion = new Schema(
    {
        nombre: String,
        correo: String,
        valor: Number
    });

//Define el esquema de servicios
var Service = new Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    valor: Number,
    calificaciones: [Calificacion],
    promedioCalificacion: Number

},
    { versionKey: false },
    { collection: 'services' });


module.exports = mongoose.model('services', Service);