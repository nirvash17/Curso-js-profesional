import mediaPlayer from "./mediaPlayer.js";
import autoPlay from './plugins/autoPlay.js'; //Lo escribo antes de que existe, para arreglar sobre la marcha

const video = document.querySelector("video");
const buttonPlay = document.querySelector('.play');
const buttonMute = document.querySelector('.mute');


<<<<<<< HEAD
const player = new mediaPlayer({video, plugins: [new autoPlay(video)] });
=======
const player = new mediaPlayer({el: video, plugins: [new autoPlay()] });
>>>>>>> e37e659bb5ae045c0f961c2068540b4b5f8ee5ee

buttonPlay.onclick = () => player.play_pause();
buttonMute.onclick = () => player.toggleMute();


      
      
