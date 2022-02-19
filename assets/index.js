import mediaPlayer from "./mediaPlayer.ts";
import autoPlay from './plugins/autoPlay.ts'; //Lo escribo antes de que existe, para arreglar sobre la marcha
import autoPause from "./plugins/autoPause.ts";

const video = document.querySelector("video");
const buttonPlay  = document.querySelector('.play');
const buttonMute = document.querySelector('.mute');


const player = new mediaPlayer({
    el: video,
    plugins: [new autoPlay(), new autoPause()],
  });
  
buttonPlay.onclick = () => player.play_pause();
buttonMute.onclick = () => player.toggleMute();




/* Se verifica que el browser tenga serviceWorker */
if ('serviceWorker' in navigator){
    //se usa el metodo .register() para relacionar la URL del scrip dado (/sw.js) con un ambito (el repo de la pagina, la ruta inicial de la pagina)
    navigator.serviceWorker.register(new URL('/sw.js', import.meta.url))//Retorna una promesa a resolver cuando se haya hecho el registro
    .catch(error => {
        console.log(error.message)  //Por si sale mal se le asigna un catch
    })
}
 