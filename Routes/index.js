const express = require('express');
const router = express.Router();

//Importar Controlador
const ProyectosController = require('../Controllers/ProyectosController');



module.exports = ()=> {

    /* Rutas */

    //GET
    router.get('/', ProyectosController.Home);
    router.get('/nuevo-proyecto', ProyectosController.FormularioProyecto);

    //POST
    router.post('/nuevo-proyecto', ProyectosController.NuevoProyecto)

    return router;
}
