const express = require('express');
const router = express.Router();

//Importar Express-Validator
//https://express-validator.github.io/docs/
const { body } = require('express-validator');

//Importar Controlador
const ProyectosController = require('../Controllers/ProyectosController');
const Proyectos = require('../Models/Proyectos');



module.exports = ()=> {

    /* Rutas */

    //GET
    router.get('/', ProyectosController.Home);
    router.get('/nuevo-proyecto', ProyectosController.FormularioProyecto);
    // Listar Proyecto
    router.get('/proyectos/:url', ProyectosController.ProyectoPorUrl);

    //POST
    router.post(
        '/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        ProyectosController.NuevoProyecto
    );

    return router;
}
