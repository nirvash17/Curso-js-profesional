import mediaPlayer from "../../mediaPlayer";
import Ads, { Ad } from "./ads";
/* Se importa la clase Ads */

class AdsPlugins{

    /* se define ads, que es del tipo dela clase Ads */
    private ads: Ads;
    private player: mediaPlayer;
    private media: HTMLMediaElement;
    private adsContainer:HTMLElement;
    private currentAd:Ad;
    private closebtn: HTMLElement;
    private counter: number;

    constructor(){
        /* se le asigna a this.ads la instancia unica de Ads (singleton) */
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement('div');
        /* Se enlaza el this de la clase a handleTimeUpdate para evitar problemas con el contexto, ya que la funcion es un callback*/
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.close = this.close.bind(this);
        this.counter = 0;
    }

    /* El metodo de todos los plugins para correrlso */
    run(player: mediaPlayer){
        this.player = player;
        this.player.container.appendChild(this.adsContainer); /* Al container del video, se le inserta el container de ads creado en el contructor */
        this.media = this.player.media;
        /* El evento timeupdate se dispara cada vez que cambia el tiempo de reproduccioon en el que va el video, creo que con una frecuencia de 4 Hz, 4 veces por segundo */
        this.media.addEventListener('timeupdate',   this.handleTimeUpdate);
        
    }

    private handleTimeUpdate(){
        /* la propiedad media.cuurenTime entrega el instante en el que va el video */
        const currentTime:number = Math.floor(this.media.currentTime);
        /* Cada 30 segs se renderizara un ad en pantalla */
        if (currentTime % 10 === 0){
            this.renderAd();
        }
    }

    private renderAd(){
        /* La frecuencia del video es 4 Hz entonces estara 4 vesces por segundo en un multipolo de 30 seg, por ende llama a renderAd() 4 veces en un seg.
        Para esto se pone este condicional, pues si no cambia el ad 4 veces por segundo*/
        this.counter = this.counter + 1;
        if (this.currentAd){
            if (this.counter === 4){
                this.currentAd = null
                this.counter = 0;
            }
            return;
        }

        /* LLama al metodo getAd de la instancia del singleton, obteniendo el ultimo ad del array de ads */
        const ad = this.ads.getAd();
        this.currentAd = ad;
        /* Se trabaja el container de ads para mostrarlos */
        this.adsContainer.innerHTML = `
            <div class="ads">
            <button class='close-btn'>X</button>
            <a class="ads__link" href="${this.currentAd.url}" target="_blank">
            <img class="ads__img" src="${this.currentAd.imageUrl}" />
            <div class="ads__info">
                <h5 class="ads__title">${this.currentAd.title}</h5>
                <p class="ads__body">${this.currentAd.body}</p>
            </div>
            </a>
            </div>
        `
        console.log('pase')
        this.closebtn = document.querySelector('.close-btn');
        this.closebtn.style.visibility = 'hidden'
        setTimeout(() => {
            this.closebtn.style.visibility = 'visible'
        }, 1000);
        this.closebtn.onclick = this.close;

    }

    close(){
        this.adsContainer.innerHTML = '';
        this.currentAd = null;
    }
}


export default AdsPlugins;