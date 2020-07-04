exports.Home = (req,res) => {
    res.render('Index', { // Llama al View llamado 'Index'
        nombrePagina: 'Proyectos'
    });
}

exports.FormularioProyecto = (req,res) => {
    res.render('NuevoProyecto', { 
        nombrePagina: 'Nuevo Proyecto'
    });
}

exports.NuevoProyecto = (req,res) => {

    //Validar que tengamos algo en el input.
    const { nombre } = req.body;
    
    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega Nombre al Proyecto'});
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto', 
            errores
        });
    } else {
        //No hay errores
        //Insertar en la BD
    }

}