const passport = require('passport');


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