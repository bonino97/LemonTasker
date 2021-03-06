const express = require('express');
const router = express.Router();

//Importar Express-Validator
//https://express-validator.github.io/docs/
const { body } = require('express-validator');

//Importar Controladores
const ProyectosController = require('../Controllers/ProyectosController');
const TareasController = require('../Controllers/TareasController');
const UsuariosController = require('../Controllers/UsuariosController');
const AuthController = require('../Controllers/AuthController');

//Importar Modelos
const Proyectos = require('../Models/Proyectos');
const Usuarios = require('../Models/Usuarios');

module.exports = ()=> {

    /* Rutas ProyectoController*/

    //GET
    router.get('/', AuthController.UsuarioAutenticado, ProyectosController.Home);
    router.get('/nuevo-proyecto', AuthController.UsuarioAutenticado, ProyectosController.FormularioProyecto);
    // Listar Proyecto
    router.get('/proyectos/:url', AuthController.UsuarioAutenticado, ProyectosController.ProyectoPorUrl);
    // Editar Proyecto
    router.get('/proyecto/editar/:id', AuthController.UsuarioAutenticado, ProyectosController.EditarProyecto);


    //POST
    router.post(
        '/nuevo-proyecto',
        AuthController.UsuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        ProyectosController.NuevoProyecto
    );

    router.post(
        '/nuevo-proyecto/:id',
        AuthController.UsuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        ProyectosController.ActualizarProyecto
    );

    //DELETE
    router.delete('/proyectos/:url', AuthController.UsuarioAutenticado, ProyectosController.EliminarProyecto); 

    /* Rutas TareasController*/

    //POST
    router.post('/proyectos/:url', AuthController.UsuarioAutenticado, TareasController.AgregarTarea);

    //PATCH
    router.patch('/tareas/:id', AuthController.UsuarioAutenticado, TareasController.ModificarEstadoTarea);
 
    //DELETE
    router.delete('/tareas/:id', AuthController.UsuarioAutenticado, TareasController.EliminarTarea);

    /* Rutas Usuarios Controller*/
    //GET
    router.get('/crear-cuenta', UsuariosController.PaginaRegistro);
    router.get('/iniciar-sesion', UsuariosController.PaginaLogin);
    router.get('/reestablecer-password', UsuariosController.PaginaReestablecerPassword);
    router.get('/confirmar/:correo', UsuariosController.ConfirmarCuenta);

    //POST
    router.post('/crear-cuenta', UsuariosController.CrearCuenta);


    /* Rutas Auth Controller*/
    //GET
    router.get('/cerrar-sesion', AuthController.CerrarSesion);
    router.get('/reestablecer-password/:token', AuthController.ValidarToken);

    //POST
    router.post('/iniciar-sesion', AuthController.AutenticarUsuario);
    router.post('/reestablecer-password', AuthController.EnviarToken);
    router.post('/reestablecer-password/:token', AuthController.ActualizarPassword);

    return router;
}
