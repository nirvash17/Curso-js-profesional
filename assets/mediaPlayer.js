function mediaPlayer(config){  //Tengo que intentar hcaer esto con clases, mejor notacion
    this.media = config.el;
    this.plugins = config.plugins || [];
    this._initPlugins();
    }


mediaPlayer.prototype._initPlugins = function(){

    this.plugins.forEach( plugin => {
        plugin.run(this);  //Esta es una instancia de un plugin, que es un objeto,se deben usar metodos => se crea el objeto plugins en autoplay
    })                      //Se envia la instancia de media player para que pueda usaral el plugin

}
    
mediaPlayer.prototype.play = function(){
this.media.play();
}

mediaPlayer.prototype.pause = function(){
this.media.pause();
}

mediaPlayer.prototype.play_pause = function(){ //Metodo que controla el play y pausa con el boton play
console.log(`paused: ${this.media.paused}`);

this.media.paused ? this.play() : this.pause(); 
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

mediaPlayer.prototype.toggleMute = function(){ //Esta solucion mas corta permite cambiar el muteo con un boton y ademas al cargar la pagina
    this.media.muted = !this.media.muted //Muy bonito
}

export default mediaPlayer; 