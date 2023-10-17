const express = require('express');

const router = express.Router();

const Pet = require('../models/pet');

const User = require('../models/user');

const bcrypt = require('bcryptjs');


//RECUPERAR TODOS OS REGISTROS
router.get('/', async (req, res) => {
    try {
        const allPets = await Pet.find({}); //pega todos

        // const Pets = await Pet.find({
        //     sexo: 'Fêmea'                //pega os pets que tiverem o sexo como femea
        // })
        res.json({ error: false, allPets })

    } catch (err) {
        res.json({ error: true, message: err.message })
    }
});

//PEGAR SOMENTE O REGISTRO COM O ID
router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const response = await Pet.findById(id);

        res.json({ error: false, response });

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

//CRIAR UM REGISTRO
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const response = await new Pet(body).save();
        res.json({ error: false, pet: response });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

//ATUALIZAR SOMENTE O REGISTRO COM O ID
router.put('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const body = req.body;

        const newPet = await Pet.findByIdAndUpdate(id, body);

        res.json({ error: false, newPet })

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});


//DELETAR SOMENTE O REGISTRO COM O ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Pet.findByIdAndDelete(id);

        res.json({ error: false });
    } catch (err) {
        res.json({ error: false, message: err.message });
    }
});

module.exports = router;