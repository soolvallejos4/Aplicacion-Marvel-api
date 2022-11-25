// Chequeo si el browser soporta service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./serviceWorker.js')
    .then((message) => {
        console.log('Service Worker OK');
    });
}else {
    console.log('Service worker no esta soportado en este browser');
}