function autoPlay(){}

autoPlay.prototype.run = function(player){
   // player.defaultMuted = true;
/*     console.log(player)
    player.toggleMute(); //El plugin juega con los metodos del reproductor
    player.play(); */

    if (!player.muted){ //Gracias al setter se puede leer la propiedad del objeto entregado
        player.muted = true; //Y aca se puede asignar otro valor, que es el value del setter
    }
    player.play();
}

export default autoPlay; 