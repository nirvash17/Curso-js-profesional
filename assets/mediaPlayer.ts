class mediaPlayer {
    
    media:HTMLMediaElement;
    plugins:Array<any>;

    constructor(config) {
        this.media = config.el;
        this.plugins = config.plugins || [];
        this.initPlugins();
    }

    private initPlugins() {

        this.plugins.forEach(plugin => {
            plugin.run(this); /* Con ts, no tengo que usar el objeto player para limitar al plugin, ya que con ts se manejan de mejor manera variables y funciones privadas
            */
        });
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    play_pause() {

        this.media.paused ? this.play() : this.pause();
        console.log(`paused: ${this.media.paused}`);

    }
    // mediaPlayer.prototype.mute = function(){ Solucion con 3 metodos, una para mutear, para desmutear y uno que cambia entre ambos con un boton
    //     this.media.muted = true;
    // }
    // mediaPlayer.prototype.unmute = function(){
    //     this.media.muted = false;
    // }
    // mediaPlayer.prototype.mute_unmute = function(){  //Controla el muteo con el boton de muteo
    //     console.log(`muted: ${this.media.muted}`);
    //     this.media.muted ? this.unmute() : this.mute(); 
    // }
    toggleMute() {
        this.media.muted = !this.media.muted; //Muy bonito
    }
}


    




export default mediaPlayer; 