const express = require('express');
const router = express.Router();

//Importar Express-Validator
//https://express-validator.github.io/docs/
const { body } = require('express-validator');

//Importar Controladores
const ProyectosController = require('../Controllers/ProyectosController');
const TareasController = require('../Controllers/TareasController')

//Importar Modelos
const Proyectos = require('../Models/Proyectos');

module.exports = ()=> {

    /* Rutas ProyectoController*/

    //GET
    router.get('/', ProyectosController.Home);
    router.get('/nuevo-proyecto', ProyectosController.FormularioProyecto);
    // Listar Proyecto
    router.get('/proyectos/:url', ProyectosController.ProyectoPorUrl);
    // Editar Proyecto
    router.get('/proyecto/editar/:id', ProyectosController.EditarProyecto);


    //POST
    router.post(
        '/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        ProyectosController.NuevoProyecto
    );

    router.post(
        '/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        ProyectosController.ActualizarProyecto
    );

    //DELETE
    router.delete('/proyectos/:url', ProyectosController.EliminarProyecto); 

    /* Rutas TareasController*/

    //POST
    router.post('/proyectos/:url', TareasController.AgregarTarea);

    //PATCH
    router.patch('/tareas/:id', TareasController.ModificarEstadoTarea);
 
    //DELETE
    router.delete('/tareas/:id', TareasController.EliminarTarea);

    return router;
}
