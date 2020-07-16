const Proyectos = require('../Models/Proyectos');
const Tareas = require('../Models/Tareas');

exports.Home = async (req,res) => {
    const usuarioId = res.locals.usuarios.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
 
    res.render('Index', { // Llama al View llamado 'Index'
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.FormularioProyecto = async (req,res) => {
    
    const usuarioId = res.locals.usuarios.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('NuevoProyecto', { 
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.NuevoProyecto = async (req,res) => {
    const usuarioId = res.locals.usuarios.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });

    var errores = [];

    try { 
        //Validar que tengamos algo en el input.
        const nombre = req.body.nombre;
        
        var errores = [];

        if(!nombre || nombre === ''){
            errores.push({'texto': 'Agrega Nombre al Proyecto'});
        }

        if(errores.length > 0){
            res.render('NuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto', 
                errores,
                proyectos
            });
        } else {
            //Inserto en la BD
            const proyecto = await Proyectos.create({ nombre, usuarioId });
            res.redirect(`/proyectos/${proyecto.url}`);
        }
    } catch (ex) {
        
        if(ex){ 
            errores.push({'texto': 'Error al agregar el Proyecto'});
        }

        console.error(ex);

        res.render('NuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto', 
            errores,
            proyectos
        });
    }
}

exports.ProyectoPorUrl = async (req,res) => {
    const usuarioId = res.locals.usuarios.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    //Consultar Tareas del Proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    })

    if(!proyecto) return next();

    res.render('Tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.EditarProyecto = async (req,res) => {
    const usuarioId = res.locals.usuarios.id;
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise])

    //Consultar Tareas del Proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    })

    //Render a la vista
    res.render('NuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto,
        tareas
    });

}

exports.ActualizarProyecto = async (req,res) => {
    const usuarioId = res.locals.usuarios.id;
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    var errores = [];

    try { 
        //Validar que tengamos algo en el input.
        const nombre = req.body.nombre;
        
        var errores = [];

        if(!nombre || nombre === ''){
            errores.push({'texto': 'Agrega Nombre al Proyecto'});
        }

        if(errores.length > 0){
            res.render('NuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto', 
                errores,
                proyectos
            });
        } else {
            await Proyectos.update( 
                { nombre: nombre }, 
                { where: { id: req.params.id } });
                
            res.redirect('/');
        }
    } catch (ex) {
        
        if(ex){
            errores.push({'texto': 'Error al agregar el Proyecto'});
        }

        console.error(ex);

        res.render('NuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto', 
            errores,
            proyectos,
            tareas
        });
    }
}

exports.EliminarProyecto = async (req,res, next) => {
    const usuarioId = res.locals.usuarios.id;
    const urlProyecto = req.params.url;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto, usuarioId}});

    if(!resultado) return next();

    res.status(200).send('Proyecto eliminado correctamente.');
}