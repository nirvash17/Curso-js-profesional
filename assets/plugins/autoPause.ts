import mediaPlayer from "../mediaPlayer";

class autoPause{
    
    /* En una clase de ts debo asignar los tipos */
    private threshold:number; //Adenas puedo definir variables privadas, haciendo que si se importa el plugin, no se tenga acceso a esat variable privada
    private isPausedByScroll:boolean;
    private isPausedByTab:boolean;
    player: mediaPlayer; //player sera una instancia de mediaPlayer
    constructor(){
        this.threshold = 0.25;
        this.isPausedByTab = false;
        this.isPausedByScroll = false;
        /*Hago un bind, pues handleIntersection es llamado por el objeto IntersectionObserver, de modo que se llama con la instancia de este objeto y no la de la clase
        , por lo tanto con bind le fijo la instancia de la clase autoPause */
        //Tambien podira usar una arrow function en handleIntersection para darle siempre la instancia de la clase autoPause
        this.handleIntersection = this.handleIntersection.bind(this);
        this.handleVisibilitychange = this.handleVisibilitychange.bind(this);

    }

    run(player){

        this.player = player; /* Guardo player en una instancia de la clase autoPause */
        //intersectionObserver es una api del DOMI que checa constantemente la posicion de un elemento respecto a un viewport que se puede especificar, por defecto es la ventana del navegador
        //Luego se le manda un handler que hara alggo para cierto margen de visibilidad respecto al root(viewport), luego se definen viewport, rootMargin y threehold
        const observer = new IntersectionObserver(this.handleIntersection, {
            root: null, //Si no se especifica o es null, es la ventana del navegador
            rootMargin: '0px',//Margen alrededor del root, por defecto es 0px
            threshold: this.threshold //Porcentaje de visibiliad del elemento target
        })
        observer.observe(player.media); //se le da al observer la instancia de player.media

        document.addEventListener("visibilitychange", this.handleVisibilitychange); //Metodo donde se echa a correr el plugin, asi que es buen lugar para poner al eventLisetener
    }

    //Funcion que solo sellama desde el plugin, asi que privada
    private handleIntersection(entries:IntersectionObserverEntry[]) { /* El handler recibe un array con los objetos observados, que contienen los datos de posicion del objeto target
        Ademas en ts se lo asigno como tipo a entries */

        const entry = entries[0];

        if (entry.isIntersecting && this.isPausedByScroll){ //Si esta intersectando y fue pausado por scroll, se da play
            this.player.play();
            this.isPausedByScroll = false;
        }else if (!entry.isIntersecting && !this.player.media.paused) { // si no esta intersectando y no esta pausado de antes, se da pausa
            this.player.pause();
            this.isPausedByScroll = true; //Se asgina que fue pausado por srcoll
        } 
    }

    private handleVisibilitychange(elem){
        const isVisible = document.visibilityState === 'visible'; //Checa si esta visible la pestaña de la pagina
        console.log('is visible? ', isVisible);
        console.log('is paused? ', isVisible);


        /* Este codigo de condicionales es para evitar que se vuelva a dar play al volver a la pestaña si ya se tenia pausadao de antes */
    
        if (isVisible && this.isPausedByTab){ //Si esta visible y fue pausado por el cambio de tab, se da play
            this.player.play();
            this.isPausedByTab = false;
        }else if (!isVisible && !this.player.media.paused) { // si no esta visible y no esta pausado de antes, se da pausa
            this.player.pause();
            this.isPausedByTab = true; //Se asgina que fue pausado por tab
        } 
    }
}

export default autoPause;