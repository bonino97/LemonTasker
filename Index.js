const express = require('express');
const routes = require('./Routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./Config/Passport');

//Helpers con funciones

const helpers = require('./Helpers');

// Crear la conexion la BD
const db = require('./Config/Db');

// Importar los modelos
require('./Models/Proyectos');
require('./Models/Tareas');
require('./Models/Usuarios');

db.sync()
    .then(() => console.log('DB Conectada al Servidor.'))
    .catch( error => console.log(error))


// Crear una App de Express.
const app = express(); 

//Cargar los Archivos Estaticos

app.use(express.static('Src'))

//Habilitar Pug

app.set('view engine', 'pug');

//Habilitar BodyParser para leer datos del formulario.
app.use(bodyParser.urlencoded({extended: true}))

// Agregamos Express Validator a toda la Aplicacion
// app.use(expressValidator());

//Añadir la carpeta de las vistas 
app.set('views', path.join(__dirname, './Views'));

//Agregar Flash Messages
app.use(flash());

app.use(cookieParser());

//Sesiones nos permiten navegar entre paginas sin autenticarnos 
app.use(session({
    secret: 'firmadelacookie',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar vardump a la aplicacion.

app.use((req, res, next) => { 
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuarios = {...req.user} || null;
    
    next();
});

//Routes
app.use('/', routes());

app.listen(3000);