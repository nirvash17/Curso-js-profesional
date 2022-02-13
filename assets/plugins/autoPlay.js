class autoPlay{

    run(player){
    // player.defaultMuted = true;
        
        !player.muted ?
        player.muted = true:
        player.muted = false;    

        player.play_pause();
    }
}


export default autoPlay;