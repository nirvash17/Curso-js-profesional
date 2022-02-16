/*  Archivo del service worker, que controlara la pagina web, con la que se le asocia, interceptando y modificando la navegacion y las peticiones, cacheando los recursos
    , por ejempplo para cuando no hay conexion,
    El sw esta en hilo distinto al original de js, por ende es completamente asincrono
    sw depende de 2 apis, fetch, para hacer peticiones en la web y cache, para almecenar data de las aplicaciones, el cache del sw es independiente del del browser
 */


/* El sw con la cache se instalan en la pc del cliente, pero en el navegador, no como una app normal */


const VERSION = 'v1';//Version de la informacion cacheada


self.addEventListener('install', event => { //Si el register sale bien se descargara el sw al cliente (el navegante creo) e intentara instalar las urls escritas por el dev 
    event.waitUntil(precache()); /* Se usa el evento install, para instalar el sw, y se usa waitUntil para decirle al browser, que se mantenga en la fase de instalacion 
    hasta que la promesa se haya resuelto, lo que ocurre cuando se intalen todos las urls del dev en cache (lo que se hace en precache) */
});

//El evento fetch se dispara cuando el navegador detecta que se esta haciendo una peticion y ejecuta un callback que tiene las propiedades de dicha peticion
//La peticion puede consitir de pedirla al repositorio fuente, los archivos necesarios para correr la pagina, js, html, css, etc.
self.addEventListener('fetch', event => {
    const request = event.request; //con .request se extrae la peticion realizada
    if (request.method !== 'GET'){ //Solo nos interasan las peticiones del tipo GET, de lo contrario se sale del callback
        return;
    }

    event.respondWith(cachedResponse(request)); //.respondeWidth, evita que el browser maneje la peticion por defecto y deja que lo haga el callback del dev (me)

    event.waitUntil(updateCache(request));/* Se llama al update cada vez que se detecta una peticion del browser y se envia la peticion */

});

async function precache() {
    const cache = await caches.open(VERSION) /* caches.open retorna una promesa que se resuelve con el objeto de cache (cache => el objeto donde se guaradara la cache, 
        para usar offline ) teniendo el nombre con el que se llama al metodo (VERSION), es decir se crea un objeto VERSION donde se guardan los archivos que se pasan a esta cache  */
    console.log(cache)
    cache.addAll([ //Añade al objeto de cache las urls que se usaran, esta es la peticion que detectara el browser
        '/',
        '/index.html',
        '/assets/index.js',
        '/assets/mediaPlayer.js',
        '/assets/plugins/autoPlay.js',
        '/assets/plugins/autoPause.js',
        '/assets/index.css',
        '/assets/ejercicio.mp4',
    ])
}

async function cachedResponse(request){
    console.log(`request, ${request}`)
    const cache = await caches.open(VERSION); //Se vuelve a abrir el objeto de cache VERSION
    const response = await cache.match(request); //Se ve que el contenido de la cache coincida con el pedido en la request del fetch, y se devuelve una promesa con el contenido de la cache
    return response || fetch(request); //Se devielve el contenido de response y si la response de undefined, es decir que no hubo coincidencia con el fetch
}   

async function updateCache(request){
    //RespondWith, si se tienen los archivos pedidos en cache, usa esos, incluso si uno de estos ha sido actualizado, dejando al usuario con data desactualizda, para 
    //esto se debe actualizar la cache constantemente
    const cache = await caches.open(VERSION); 
    const response = await fetch(request);

    //Luego se agrega al cache el contenido de la nueva peticion
    return response.status === 200 //Esto es ya que la peticion del video da una codigo de respuesta 206, que no era sopertado por el cache.put()
        ? cache.put(request, response) 
        : new Promise((resolve, reject) => resolve(':D'));      
}