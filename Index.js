const express = require('express');
const routes = require('./Routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear la conexion la BD
const db = require('./Config/Db');

db.sync()
    .then(() => console.log('DB Conectada al Servidor.'))
    .catch( error => console.log(error))

// Importar el modelo
require('./Models/Proyectos');

// Crear una App de Express.
const app = express(); 

//Cargar los Archivos Estaticos

app.use(express.static('Src'))

//Habilitar Pug

app.set('view engine', 'pug');

//Añadir la carpeta de las vistas 
app.set('views', path.join(__dirname, './Views'));

//Habilitar BodyParser para leer datos del formulario.
app.use(bodyParser.urlencoded({extended: true}))

//Routes
app.use('/', routes());

app.listen(3000);