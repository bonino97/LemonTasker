const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo de autenticacion
const Usuarios = require('../Models/Usuarios');

//LocalStrategy - Login con Credenciales propios (Usuario y Password)
passport.use(
    new LocalStrategy(
        //Por default passport espera un Usuario y Password
        { 
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { 
                        email: email,
                        activo: 1
                    } 
                });
                
                //El usuario existe pero password incorrecto.
                if(!usuario.VerificarPassword(password)){
                    return done(null, false, {
                        message: 'Password incorrecto.'
                    })
                }
                //Email existe password correcto
                return done(null, usuario);
            } catch(error) { 
                //Ese usuario no existe.
                return done(null, false, {
                    message: 'Email o password invalido.'
                })
            }
        }
    )
)

//Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});


//Exportar usuario
module.exports = passport;