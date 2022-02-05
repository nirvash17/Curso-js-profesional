function autoPlay(){}

autoPlay.prototype.run = function(player){
   // player.defaultMuted = true;
    console.log(player)
    player.toggleMute(); //El plugin juega con los metodos del reproductor
    player.play();
}

export default autoPlay;