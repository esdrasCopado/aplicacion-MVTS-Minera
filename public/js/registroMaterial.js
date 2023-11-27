
const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    numeroViaje: String,
    tipoMaterial: String,
    peso: Number,
    fecha: Date 
});

const RegistroMaterial = mongoose.model('RegistroMaterial', MaterialSchema);



module.exports=RegistroMaterial;
