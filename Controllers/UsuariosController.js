const Usuarios = require('../Models/Usuarios');
const enviarEmail = require('../Handlers/Email');

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

        //Crear una URL para confirmar usuario
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario 
        const usuario = {
            email
        }

        //Enviar mail
        await enviarEmail.EnviarCorreo({
            usuario,
            subject: 'Confirmar Cuenta',
            confirmarUrl ,
            archivo: 'ConfirmarCuenta'
        });

        //Redirigir al usuario
        req.flash('correcto', 'Ya estas casi listo, verifica tu mail y confirma tu cuenta.')
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

exports.PaginaReestablecerPassword = (req,res) => {
    res.render('ReestablecerContraseña', {
        nombrePagina: 'Reestablecer Contraseña',
    })
}

exports.ConfirmarCuenta = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    })
    console.log(usuario);
    if(!usuario){
        console.log('asdasdasd');
        req.flash('error', 'Cuenta inexistente');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta creada correctamente.');
    res.redirect('/iniciar-sesion');
}