import mediaPlayer from "../mediaPlayer";

class autoPlay {
    constructor() { }
    run(player:mediaPlayer) {
        // player.defaultMuted = true;
        /*     console.log(player)
            player.toggleMute(); //El plugin juega con los metodos del reproductor
            player.play(); */
        if (!player.media.muted) { //Gracias al setter se puede leer la propiedad del objeto entregado
            player.media.muted = true; //Y aca se puede asignar otro valor, que es el value del setter
        }
        player.play();
    }
}


export default autoPlay; 