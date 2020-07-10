const Sequelize = require('sequelize');
const Db = require('../Config/Db');
const Proyectos = require('./Proyectos')

const Tareas = Db.define('tareas', {     
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
})

Tareas.belongsTo(Proyectos);
module.exports = Tareas; 