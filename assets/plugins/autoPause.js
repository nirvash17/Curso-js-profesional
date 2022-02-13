class autoPause{

    constructor(){
        this.threshold = 0.25;
        
        /*Hago un bind, pues handleIntersection es llamado por el objeto IntersectionObserver, de modo que se llama con la instancia de este objeto y no la de la clase
        , por lo tanto con bind le fijo la instancia de la clase autoPause */
        //Tambien podira usar una arrow function en handleIntersection para darle siempre la instancia de la clase autoPause
        this.handleIntersection = this.handleIntersection.bind(this);
    }

    run(player){

        this.player = player; //Guardo player en una instancia de la clase autoPause

        //intersectionObserver es una api del DOMI que checa constantemente la posicion de un elemento respecto a un viewport que se puede especificar, por defecto es la ventana del navegador
        //Luego se le manda un handler que hara alggo para cierto margen de visibilidad respecto al root(viewport), luego se definen viewport, rootMargin y threehold
        const observer = new IntersectionObserver(this.handleIntersection, {
            root: null, //Si no se especifica o es null, es la ventana del navegador
            rootMargin: '0px',//Margen alrededor del root, por defecto es 0px
            threshold: this.threshold //Porcentaje de visibiliad del elemento target
        })
        observer.observe(player.media); //se le da al observer la instancia de player.media
    }

    handleIntersection(entries) { //El handler recibe un array con los objetos observados, que contienen los datos de posicion del objeto target
        const entry = entries[0];
        console.log(entry);

        entry.isIntersecting ? this.player.play() : this.player.pause();
        //isIntersecting atributo del objeto observado,que ve si esta fuera del rango o no 
    }
}

export default autoPause;