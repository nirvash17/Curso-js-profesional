class mediaPlayer{
      //Tengo que intentar hcaer esto con clases, mejor notacion
    constructor({video, plugins}){
        this.media = video;
        this.plugins = plugins || [];
        this._initPlugins();
    }

    _initPlugins(){
        this.plugins.forEach( plugin => {
            plugin.run();  //Esta es una instancia de un plugin, que es un objeto,se deben usar metodos => se crea el objeto plugins en autoplay
        })                      //Se envia la instancia de media player para que pueda usaral el plugin
    }

    play_pause(){ //Metodo que controla el play y pausa con el boton play
        console.log(`paused: ${this.media.paused}`);

        this.media.paused ? this.media.play() : this.media.pause(); 
    }

    toggleMute(){ //Esta solucion mas corta permite cambiar el muteo con un boton y ademas al cargar la pagina
        this.media.muted = !this.media.muted //Muy bonito
    }
}
export default mediaPlayer; 