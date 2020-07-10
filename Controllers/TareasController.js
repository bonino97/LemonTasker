const Proyectos = require('../Models/Proyectos');
const Tareas = require('../Models/Tareas');

exports.AgregarTarea = async (req,res,next) => {

    //Obtenemos el Proyecto Actual

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    console.log(proyecto);
    const {tarea} = req.body;

    //Estado 0 = Incompleto y id del Proyecto.
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la base de datos.
    const result = await Tareas.create({
                        tarea,
                        estado,
                        proyectoId
                    })
    if(!result) return next(); 

    //Redireccionar

    res.redirect(`/proyectos/${req.params.url}`);

}  

exports.ModificarEstadoTarea = async (req,res, next ) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({
        where: {
            id
        }
    });
    //Cambiar el Estado
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }

    tarea.estado = estado;

    const result = await tarea.save();

    if(!result) return next();

    res.status(200).send('Actualizado')

}

exports.EliminarTarea = async (req,res,next) => {
    const {id} = req.params;
    const result = await Tareas.destroy({
        where: {
            id
        }
    })

    if(!result) return next();

    res.status(200).send('Tarea Eliminada.')
}