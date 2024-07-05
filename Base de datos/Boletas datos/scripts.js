import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0
//addEventListener me permite capturar un evento 
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-register').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const Boleta = {
                'total': document.getElementById('BoletaTotal').value,
                'met': document.getElementById('BoletaMetodo').value.trim(),
                'date': document.getElementById('BoletaFecha').value,
                'stock': document.getElementById('BoletaCantidad').value
            }
            save(Boleta)
            limpiar()
        }else{
            const Boleta = {
                'total': document.getElementById('BoletaTotal').value,
                'met': document.getElementById('BoletaMetodo').value.trim(),
                'date': document.getElementById('BoletaFecha').value,
                'stock': document.getElementById('BoletaCantidad').value
            }
            //se invoca la función para actualizar
            update(id,Boleta)
            limpiar()
            //volver al estado inciial la variable de i 
            id = 0
        }
    }
})
//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.total}</td>
            <td>${item.met}</td>
            <td>${item.date}</td>
            <td>${item.stock}</td>
            <td nowrap>
                <button class="table-container btn-warning" id="${doc.id}">Editar</button>
                <button class="table-container btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        //seleccionar el documento
        document.querySelectorAll('.btn-warning').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() =>{
                //invocar función para buscar el documento por su id
                const doc = await obtener(btn.id)
                //obtener los valores del documento
                const d = doc.data()
                //asignar los valores a los input
                document.getElementById('BoletaTotal').value = d.total
                document.getElementById('BoletaMetodo').value = d.met
                document.getElementById('BoletaFecha').value = d.date
                document.getElementById('BoletaCantidad').value = d.stock
                //modificar el valor del botón 
                document.getElementById('btnGuardar').value = 'Modificar'
                //asignar el id del documento a nuestra variable
                id = btn.id
            })
        })

    })
})

