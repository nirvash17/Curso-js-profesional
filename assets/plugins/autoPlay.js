class autoPlay{

    constructor(video){
        this.player = video;

    }

    run(){
    // player.defaultMuted = true;
        this.player.muted = true;
        this.player.play();    
    }
}


export default autoPlay;