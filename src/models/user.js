const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    petFavorites: {
        type: Array,
        required: false
    },
    petsCreated: {
        type: Array,
        required: false
    }

});

module.exports = User;