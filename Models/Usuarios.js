const Sequelize = require('sequelize');
const Db = require('../Config/Db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const Usuarios = Db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Email incorrecto.'
            },
            notEmpty: {
                msg: 'Debe colocar un email.'
            }
        },
        unique: {
            args: true,
            msg: 'Email existente.'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debe colocar una contraseña.'
            }
        }
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0 
    }
    
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
})

//Metodos personalizados

Usuarios.prototype.VerificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);
module.exports = Usuarios; 