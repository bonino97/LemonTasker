import Swal from 'sweetalert2';
import axios from 'axios';
import { actualizarAvance } from '../functions/avance';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener( 'click', e=> {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.dataset.tarea;

            //Request a /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, {idTarea})
                .then(function(resp){
                    if(resp.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        } 

        if(e.target.classList.contains('fa-trash')){
            
            const tareaHTML = e.target.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

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
                    const url = `${location.origin}/tareas/${idTarea}`; 
                    //Enviar delete por medio de axios
                    axios.delete(url, {params: {idTarea}})
                        .then(function(resp){
                            if(resp.status === 200){
                                //Eliminar el Nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);
                                //Opcional una alerta
                                Swal.fire(
                                    'Tarea eliminada correctamente...',
                                    resp.data,
                                    'success'
                                )

                                actualizarAvance();
                            }
                    })
                }
            })
        }
    });
}

export default tareas;