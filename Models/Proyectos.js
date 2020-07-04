const Sequelize = require('sequelize');
const Db = require('../Config/Db');
const Proyectos = Db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Proyectos;