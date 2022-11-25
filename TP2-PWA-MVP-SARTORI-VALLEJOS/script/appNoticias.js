let estado = document.getElementById('estado');
estado.innerHTML = "";


window.addEventListener('offline', event =>{
    estado.innerHTML = '<h2 class="text-light">usuario esta desconectado!</h2>';
});

window.addEventListener('online', event =>{
    console.log('usuario esta conectado', event);
});

if( !navigator.onLine ){
    console.log('estoy sin conexion durante la carga');
}