const Sequelize = require('sequelize');
const Db = require('../Config/Db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = Db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        //Se ejecuta antes de insertar en la Base de Datos.
        //https://sequelize.org/v4/manual/tutorial/hooks.html
        beforeCreate(proyecto){   
            const url = slug(proyecto.nombre).toLocaleLowerCase();
            proyecto.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Proyectos;