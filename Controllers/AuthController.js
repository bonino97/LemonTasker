const passport = require('passport');
const Usuarios = require('../Models/Usuarios');
const crypto = require('crypto');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../Handlers/Email');


//Passport tiene muchas estrategias, la que vamos a usar es local 
//Si quisiera autenticarme por Facebook tendria que usar la estrategia Facebook

exports.AutenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.UsuarioAutenticado = (req,res,next) => {
    //Si el usuario esta autenticado, dejarlo seguir

    if(req.isAuthenticated()){
        return next();
    }

    //Si no, redireccionar a iniciar sesion
    return res.redirect('/iniciar-sesion');
}

exports.CerrarSesion = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    }) 
}

exports.EnviarToken = async (req,res) => { //Genera un Token si el usuario es valido.
    //Verificar que el usuario exista
    const usuario = await Usuarios.findOne({
        where: {
            email : req.body.email
        }
    })

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta.');
        res.render('ReestablecerContraseña', {
            nombrePagina: 'Reestablecer Contraseña',
            mensajes: req.flash()
        })
    }
    //Usuario Existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    //Expiracion
    usuario.expiracion = Date.now()+3600000;

    //Guardo en la Base de Datos
    await usuario.save();

    //Url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer-password/${usuario.token}`;

    //Envia correo con el Token
    await enviarEmail.EnviarCorreo({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'ResetPassword'
    });

    req.flash('correcto', 'Verifique su Correo.')
    res.redirect('/iniciar-sesion')
}

exports.ValidarToken = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    }) 

    if(!usuario) {
        req.flash('error', 'Token invalido');
        res.redirect('/reestablecer-password')
    }

    //Formulario para generar el Password
    res.render('NuevaContraseña', {
        nombrePagina: 'Nueva Contraseña'
    })
}

//Cambia password por uno nuevo.
exports.ActualizarPassword = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    }) 
    //Verificamos si el usuario existe
    if(!usuario) {
        req.flash('error', 'Token invalido');
        res.redirect('/reestablecer-password')
    }

    usuario.token = null;
    usuario.expiracion = null;
    //Hashear el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    await usuario.save();

    req.flash('correcto', 'Tu password se ha modificado correctamente.');
    res.redirect('/iniciar-sesion');
}