const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const Yup = require('yup');

const User = require('../models/user');

//CRIAR LOGIN
router.post('/signup', async (req, res) => {

    try {

        const body = req.body;

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().required().email(),
            senha: Yup.string().required().min(8),
            telefone: Yup.string().required().min(10),
            cidade: Yup.string().required(),
            estado: Yup.string().required()
        });

        if (!(await schema.isValid(body))) {
            return res.json({ error: true, message: 'Dados inválidos' });
        };

        body.senha = await bcrypt.hash(body.senha, 7);

        const emailExist = await User.findOne({ email: body.email });

        if (emailExist) {

            return res.json({ error: true, message: 'Este email já possui um cadastro.' });
        } else {

            const user = await new User(body).save();
            res.json({ error: false, user });
        }

    } catch (err) {
        res.json({ error: true, message: err.message });
    }

});


//FAZER LOGIN
router.post('/login', async (req, res) => {
    try {

        const body = req.body;

        const user = await User.findOne({ email: body.email });

        if (!user) {
            return res.json({ error: true, message: 'Usuário não encontrado.' });
        };

        if (!(await bcrypt.compare(body.senha, user.senha))) {
            return res.json({ error: true, message: 'Senha incorreta.' });
        };

        res.json({ error: false, user });

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;


//TRAZ DADOS DO USUARIO
router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const user = await User.findById(id);

        res.json({ error: false, user });


    } catch (err) {
        res.json({ error: true, message: err.message });
    }

});


//ATUALIZA USUARIO
router.put('/refresh/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const body = req.body;

        const userRefreshed = await User.findByIdAndUpdate(id, body);

        res.json({ error: false, userRefreshed });

    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});