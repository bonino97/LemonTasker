const Usuarios = require('../Models/Usuarios');

exports.PaginaRegistro = async (req,res) => {
    res.render('CrearCuenta', {
        nombrePagina: 'Crear Cuenta en LemonTasker'
    })
}

exports.PaginaLogin = async (req,res) => {
    const {error} = res.locals.mensajes;
    res.render('IniciarSesion', {
        nombrePagina: 'Iniciar Sesion en LemonTasker',
        error
    })
}

exports.CrearCuenta = async (req,res) => {
    //Leer los datos
    const {email, password} = req.body;

    try {
        //Crear el usuario
        await Usuarios.create({
            email,
            password
        });

        res.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('CrearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en LemonTasker',
            email,
            password
        })
    }
}