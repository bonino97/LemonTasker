import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');


if(btnEliminar){
    btnEliminar.addEventListener('click', (e) => { 

        const urlProyecto = e.target.dataset.proyectoUrl;


        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado, no se puede recuperar...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor:  '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si', 
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {

              const url = `${location.origin}/proyectos/${urlProyecto}`

              //enviar peticion a axios

              axios.delete(url, {params: urlProyecto})
                .then(function(resp){
                  Swal.fire(
                    'Eliminado!', 
                    resp.data,
                    'success'
                  )
        
                  setTimeout(() => {
                      location.href = "/"
                  }, 1500);  
                })
                .catch( () => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'No se pudo eliminar el Proyecto.'
                  })
                })
            }
        }) 
    }); 
}

export default btnEliminar;
