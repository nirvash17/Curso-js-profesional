import mediaPlayer from "./mediaPlayer";
import autoPlay from './plugins/autoPlay'; //Lo escribo antes de que existe, para arreglar sobre la marcha
import autoPause from "./plugins/autoPause";
import AdsPlugins from "./plugins/ads/index";
import VideoBar from "./plugins/videoBar";
import VolumeBar from './plugins/volume'

const video :HTMLMediaElement= document.querySelector("video");

let buttonPlay:HTMLElement  = document.querySelector('.play');
let buttonMute:HTMLElement = document.querySelector('.mute');

const player = new mediaPlayer({
    el: video,
    plugins: [new autoPlay(), new autoPause(), new AdsPlugins(), new VideoBar(), new VolumeBar],
    play: buttonPlay,
    mute: buttonMute
  });

buttonPlay  = document.querySelector('.play');
buttonMute = document.querySelector('.mute');
buttonPlay.onclick = () => player.play_pause();
buttonMute.onclick = () => player.toggleMute();

console.log(buttonPlay.onclick)

/* Se verifica que el browser tenga serviceWorker */
if ('serviceWorker' in navigator){
    //se usa el metodo .register() para relacionar la URL del scrip dado (/sw.js) con un ambito (el repo de la pagina, la ruta inicial de la pagina)
    navigator.serviceWorker.register(new URL('/sw.js', import.meta.url))//Retorna una promesa a resolver cuando se haya hecho el registro
    .catch(error => {
        console.log(error.message)  //Por si sale mal se le asigna un catch
    })
}
