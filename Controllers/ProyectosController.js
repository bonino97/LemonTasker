const Proyectos = require('../Models/Proyectos');

exports.Home = async (req,res) => {
    
    const proyectos = await Proyectos.findAll();

    res.render('Index', { // Llama al View llamado 'Index'
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.FormularioProyecto = async (req,res) => {
    
    const proyectos = await Proyectos.findAll();

    res.render('NuevoProyecto', { 
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.NuevoProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    var errores = [];

    try { 
        //Validar que tengamos algo en el input.
        const nombre = req.body.nombre;
        
        var errores = [];

        if(!nombre || nombre === ''){
            errores.push({'texto': 'Agrega Nombre al Proyecto'});
        }

        if(errores.length > 0){
            res.render('nuevoProyecto', {
                nombrePagina: 'Nuevo Proyecto', 
                errores,
                proyectos
            });
        } else {
            const proyecto = await Proyectos.create({ nombre });
            res.redirect('/');
        }
    } catch (ex) {
        
        if(ex){
            errores.push({'texto': 'Error al agregar el Proyecto'});
        }

        console.error(ex);

        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto', 
            errores,
            proyectos
        });
    }
}

exports.ProyectoPorUrl = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}