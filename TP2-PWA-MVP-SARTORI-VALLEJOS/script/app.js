const urlAPI = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=f3297e69a443ce05c0618bedeefa9f2e&hash=852f0c4875f5c7cbe19ffaa8c2498c2c";
const urlAPIbusqueda = `https://gateway.marvel.com:443/v1/public/characters?&name=${inputBusqueda.value}&ts=1&apikey=f3297e69a443ce05c0618bedeefa9f2e&hash=852f0c4875f5c7cbe19ffaa8c2498c2c`;
const botonBusqueda = document.getElementById("botonBuscar");
const contenedorRecomendados = document.getElementById("contenedorHeroesRecomendados");
const contenedorRecomendados2 = document.getElementById("contenedorHeroesRecomendados2");
const contenedorHeroes = document.getElementById("contenedorHeroes");
const contenedorHeroesFavoritos = document.getElementById("contenedorHeroesFavoritos");
const encabezado = document.getElementById("encabezado");
const titulo1 = document.getElementById("titulo-1");
const titulo2 = document.getElementById("titulo-2");
let HeroesBuscados = [];
let HeroesRecomendados = [];
let HeroesRecomendados2 = [];
let estado = document.getElementById('estado');
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

botonBusqueda.addEventListener("click", (e) => {
    e.preventDefault();
    titulo1.style.display = "none";
    titulo2.style.display = "none";
    encabezado.style.display = "none";
    contenedorRecomendados.style.display = "none";
    contenedorRecomendados2.style.display = "none";
    const inputBusqueda = document.getElementById("inputBusqueda").value;
    buscarHeroesPorNombre(inputBusqueda);
});

const buscarHeroesPorNombre = async (nombre) => {

    await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?&name=${nombre}&ts=1&apikey=f3297e69a443ce05c0618bedeefa9f2e&hash=852f0c4875f5c7cbe19ffaa8c2498c2c`
      )      
      .then((resp) => resp.json())
      .then((json) => {
        const heroes = json.data.results;
        HeroesBuscados = heroes;
        crearTarjetasHeroes(HeroesBuscados, contenedorHeroes);     
    });
}
const obtenerHeroesRecomendados = async () => {
  await fetch(urlAPI)
    .then((res) => res.json())
    .then((json) => {
      const heroes = json.data.results.splice(0, 3);
      HeroesRecomendados = heroes;
    crearTarjetasHeroes(HeroesRecomendados, contenedorRecomendados);
    console.log(heroes);
    });
};
const obtenerHeroesRecomendados2 = async () => {
    await fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => {
        const heroes = json.data.results.splice(5, 3);
        HeroesRecomendados2 = heroes;
      crearTarjetasHeroes(HeroesRecomendados2, contenedorRecomendados2);
      console.log(heroes);
      });
};
const crearTarjetasHeroes = (heroes, contenedor) => {
    contenedor.innerHTML = "";
    let listaSeries = "";

    for (const heroe of heroes) {
        if (heroe.series.items.length) {
          for (const serie of heroe.series.items.slice(0,1)) {
            listaSeries += `
                        <li>${serie.name}</li>
                        `;
          }
        }

        let tarjeta = `
        
        <div class="col-lg-3 col-md-6 col-sm-12 mb-3 mt-3">
        <div class= "card-personaje ">
        <img class="card-img-top" src="${heroe.thumbnail.path}.${
        heroe.thumbnail.extension
         }" " alt="Card image cap" id="imagen">
        <h3 class="text-center text-white pt-4"> ${heroe.name} </h3>

        <button type="button" class=" mt-3 mx-auto btn d-flex boton-ver" data-bs-toggle="modal"

        data-bs-target="#card-heroe-${heroe.id}"> VER MAS </button>
        <button id="${heroe.id}" type="button" class=" mt-3 mx-auto btn d-flex boton-ver"> <i class="fa-regular fa-star" id="${heroe.id}.icono"></i> </button>
       
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
contenedor.innerHTML += tarjeta;
}
heroes.forEach (heroe => {
    document.getElementById(heroe.id).addEventListener("click", e => {
        agregarHeroeAFavorito(heroe);
        
        let icono = document.getElementById(`${heroe.id}.icono`);
            icono.setAttribute("class","fa-solid fa-star");
        })
    })

};

const agregarHeroeAFavorito = (heroe) => {
    if(localStorage.getItem('heroesFavoritos') == null){
        localStorage.setItem('heroesFavoritos', JSON.stringify([]));
    }
    const listaHeroesFavoritos = JSON.parse(localStorage.getItem('heroesFavoritos'));
    const heroeEncontrado = listaHeroesFavoritos.find(h => {
        return h.id == heroe.id;
    });
    if(!heroeEncontrado){
        listaHeroesFavoritos.push(heroe);
    }
    localStorage.setItem('heroesFavoritos', JSON.stringify(listaHeroesFavoritos));
};

obtenerHeroesRecomendados();
obtenerHeroesRecomendados2();

  
