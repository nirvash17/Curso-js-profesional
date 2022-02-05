<<<<<<< HEAD
class autoPlay{

    constructor(video){
        this.player = video;
        console.log('xd ', + video)

    }

    run(){
    // player.defaultMuted = true;
        this.player.muted = true;
        this.player.play();    
    }
}
=======
function autoPlay(){}

autoPlay.prototype.run = function(player){
   // player.defaultMuted = true;
    console.log(player)
    player.toggleMute(); //El plugin juega con los metodos del reproductor
    player.play();
}

>>>>>>> e37e659bb5ae045c0f961c2068540b4b5f8ee5ee
export default autoPlay;