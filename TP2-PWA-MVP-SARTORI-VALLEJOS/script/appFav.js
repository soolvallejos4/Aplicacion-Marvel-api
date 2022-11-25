const contenedorHeroesFavoritos = document.getElementById('contenedorHeroesFavoritos');
const botonBusqueda = document.getElementById("botonBuscar");
const contenedorHeroes = document.getElementById("contenedorHeroes");
const mensajeFavoritos = document.getElementById("mensajeFavoritos");
let estado = document.getElementById("estado");
estado.innerHTML = "";


window.addEventListener('offline', event =>{
    estado.innerHTML = '<h2 class="text-light">usuario esta desconectado!</h2>';
});

window.addEventListener('online', event =>{
    console.log('usuario esta conectado', event);
});

if( !navigator.onLine ){
    console.log('estoy sin conexion en el momento de carga');
}

const cargarFavoritos = (heroes) => {
  // const listadoFavoritos = heroes ? heroes : JSON.parse(localStorage.getItem('heroesFavoritos'));
  let listadoFavoritos = [];
  if(heroes){
    listadoFavoritos = heroes; 
  }else{
    listadoFavoritos = JSON.parse(localStorage.getItem('heroesFavoritos'));
  }
  contenedorHeroesFavoritos.innerHTML = '';
  console.log(listadoFavoritos); 

  for(heroe of listadoFavoritos){
    let listaSeries = "";
    if (heroe.series.items.length) {
      for (const serie of heroe.series.items.slice(0, 3)) {
        listaSeries += `
                    <li>${serie.name}</li>
                    `;
      }
    }
    let tarjeta =` 
    <div class="col-lg-3 col-md-6 col-sm-12 mb-3 mt-3">
    <div class= "card-personaje ">
    <img class="card-img-top" src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="Card image cap" id="imagen">
    <h3 class="text-center text-white pt-4"> ${heroe.name} </h3>

    <button type="button" class=" mt-3 mx-auto btn d-flex boton-ver" data-bs-toggle="modal"

    data-bs-target="#card-heroe-${heroe.id}"> VER MAS </button>
    <button id="${heroe.id}" type="button" class=" mt-3 mx-auto btn d-flex boton-ver"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    


    <div class="modal fade" id="card-heroe-${heroe.id}" role="dialog" tabindex="-1" aria-hidden="true"
    aria-labelledby="modalTitle">
    <div class="modal-dialog" role="document">
        <div class="modal-header">
            <h3 class="modal-title text-white text-center" id="modalTitle">${heroe.name} </h3>
              
        </div>
        <div class="modal-body">
            <img class="img-fluid" src="${
              heroe.thumbnail.path
            }.${heroe.thumbnail.extension}" alt="">
            <p class= "text-white mt-2"> ${heroe.description.substr(0)}</p>
            <h4 class= "text-white">Series: </h4>
            <ul class="text-white">
                 ${listaSeries}
            </ul>
 
        </div>
        <div class="modal-footer d-flex justify-content-center align-items-center">
            <button tabindex="button" class="btn boton-cerrar" data-bs-dismiss="modal"> Cerrar</button>
        </div>
    </div>
</div>
  </div>
</div> 
      `;
    
      contenedorHeroesFavoritos.innerHTML += tarjeta;
}
listadoFavoritos.forEach(heroe => {
  document.getElementById(heroe.id).addEventListener('click', () => {
      borrarHeroe(heroe);
  })
});

const borrarHeroe = (heroe) => {
  const listadoFavoritos = JSON.parse(localStorage.getItem('heroesFavoritos'));
  const listaRenovada = listadoFavoritos.filter(h => {
    return h.id !== heroe.id;
  })

  localStorage.setItem('heroesFavoritos', JSON.stringify(listaRenovada));
  cargarFavoritos(listaRenovada);
}
}

const buscarHeroesPorNombre = async (nombre) => {

  await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?&name=${nombre}&ts=1&apikey=f3297e69a443ce05c0618bedeefa9f2e&hash=852f0c4875f5c7cbe19ffaa8c2498c2c`
    )      
    .then((resp) => resp.json())
    .then((json) => {
      const heroes = json.data.results;
      HeroesBuscados = heroes;
      crearTarjetasHeroes(HeroesBuscados, contenedorHeroesFavoritos);     
  });
}

cargarFavoritos();