const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', {
    nome: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    tamanho: {
        type: String,
        required: true
    },
    porte: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    dono: {
        type: String,
        required: true
    },
    idDono: {
        type: Array,
        required: true
    },
    telefoneDono: {
        type: String,
        required: true
    },
    fotoDono:{
        type: String,
        required:false
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
});

module.exports = Pet;