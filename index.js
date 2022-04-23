const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv/config');

const port = process.env.PORT || 3000;

app.use(bodyParser.json({
    limit: '100mb'
}));

app.use(bodyParser.urlencoded({
    limit: '100mb',
    parameterLimit: 100000,
    extended: true
}));

const petRoutes = require('./src/routes/main.routes');
const userRoutes = require('./src/routes/login.routes');


//CONEXAO COM BANCO
mongoose.connect(process.env.PATH_DB || 'mongodb://localhost:27017/seupet', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

//ROTAS
app.use('/', petRoutes);
app.use('/user', userRoutes);


app.listen(port, () => {
    console.log('Servidor rodando');
});