// variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; 

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', ()  => {
        articulosCarrito = [];
        limpiarHTML(); 
    })
}

//funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
    }
}

//elimina un curso del carrito 
function eliminarCurso(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId =e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    } 
}

// leer contenido de HTML

function leerDatosCursos(cursoSeleccionado) {
    // console.log(cursoSeleccionado);
    const infoCurso= {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa que un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map( curso => {
            if (curso.id ===  infoCurso.id){
                curso.cantidad++;
                return curso;
            }else {
                return curso;  
            }
        });
        articulosCarrito = [...cursos]; 
    }else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    

    // Agg elementos al arreglo del carrito
    console.log(articulosCarrito);
    carritoHTML();
}
//Muestra el carrito en el HTML
function carritoHTML() {

   //limpiar el HTML
   limpiarHTML(); 
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const  {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td><img src="${imagen}" width="150";></td> 
            <td>${titulo}</td> 
            <td>${precio}</td> 
            <td>${cantidad}</td> 
            <td><a href="#" class="borrar-curso" data-id="${id}" > X </a> </td> 
        `;  

        // AGG EL HTML DEL CARRITO EN EL TBODY
        contenedorCarito.appendChild(row);
    })
}
//Elimina los cursos dele tbody
function limpiarHTML() {
    while(contenedorCarito.firstChild) {
        contenedorCarito.removeChild(contenedorCarito.firstChild)   
    }
}