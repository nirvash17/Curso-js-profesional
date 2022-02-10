function mediaPlayer(config){  //Tengo que intentar hcaer esto con clases, mejor notacion
    this.media = config.el;
    this.plugins = config.plugins || [];
    this._initPlugins();
    }


mediaPlayer.prototype._initPlugins = function(){

    
    const player = {
        play: () => this.play(),
        pause: () => this.pause(),
        media: this.media, //Se crea un media, pues de otro modo el this de abajo apunta al objeto player y no al del objeto general

        get muted(){ //El getter permite leer propiedades de un objeto, a traves de una funcion, pero como propiedades que es mas comodo como notacion
            return this.media.muted; //Ademas de dentro de la funcion, hacer cambios dinamicos
        },
        set muted(value){ //Luego con el setter se pueden cambiar estas propiedades desde fuera
            this.media.muted = value;
        }
    }
    debugger
    this.plugins.forEach( plugin => {
        plugin.run(player);  /* Tras set y get, al plugin le evio solo el objeto creado en el proto, es decir, ya no le envio todas las propiedades
        del objeto al plugin, limitando su manejo sobre el objeto
        */
    })                       
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