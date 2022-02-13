import mediaPlayer from "./mediaPlayer.js";
import autoPlay from './plugins/autoPlay.js'; //Lo escribo antes de que existe, para arreglar sobre la marcha
import autoPause from "./plugins/autoPause.js";

const video = document.querySelector("video");
const buttonPlay = document.querySelector('.play');
const buttonMute = document.querySelector('.mute');


const player = new mediaPlayer({el: video, plugins: [new autoPlay(), new autoPause()] });

buttonPlay.onclick = () => player.play_pause();
buttonMute.onclick = () => player.toggleMute();


      
      
