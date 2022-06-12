const menu = document.querySelector('.conleccion');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnMujeres = document.querySelector('.mujeres');
const btnHombres = document.querySelector('.hombre');
const btnNinos = document.querySelector('.nino');
const btnNinas = document.querySelector('.nina');
const contenedorRopas = document.querySelector('.ropas');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    ropas();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
     observer.observe(imagen);
 });

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const ropas = () =>{
    let ropasArreglo = [];
    const ropas = document.querySelectorAll('.ropa');

    ropas.forEach(ropa=> ropasArreglo = [...ropasArreglo,ropa]);

    const mujeres = ropasArreglo.filter(mujer=> mujer.getAttribute('data-ropa') === 'mujer');
    const hombres = ropasArreglo.filter(hombre => hombre.getAttribute('data-ropa') === 'hombre');
    const ninos = ropasArreglo.filter(nino => nino.getAttribute('data-ropa') === 'nino');
    const ninas = ropasArreglo.filter(nina=> nina.getAttribute('data-ropa') === 'nina');

    mostrarRopas(mujeres, hombres, ninos, ninas, ropasArreglo);

}

const mostrarRopas = (mujeres, hombres, ninos, ninas, todos) =>{
    btnMujeres.addEventListener('click', ()=>{
        limpiarHtml(contenedorRopas);
        mujeres.forEach(mujer=> contenedorRopas.appendChild(mujer));
    });

    btnHombres.addEventListener('click', ()=>{
        limpiarHtml(contenedorRopas);
        hombres.forEach(hombre=> contenedorRopas.appendChild(hombre));
    });

    btnNinos.addEventListener('click', ()=>{
        limpiarHtml(contenedorRopas);
        ninos.forEach(nino=> contenedorRopas.appendChild(nino));
    });
    btnNinas.addEventListener('click', ()=>{
        limpiarHtml(contenedorRopas);
        ninas.forEach(nina=> contenedorRopas.appendChild(nina));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorRopas);
        todos.forEach(todo=> contenedorRopas.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}