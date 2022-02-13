class autoPause{

    constructor(){
        this.threshold = 0.25; //Porcentaje de visibiliad
           }

    run(player){

        this.player = player; //Guardo player en una instancia de la clase autoPause

        const observer = new IntersectionObserver(this.handleIntersection, {
            threshold: this.threshold 
        })
        observer.observe(player.media); //se le da al observer la instancia de player.media
    }

    //En la rama de clases, hago el handler una arrow function, asi su instancia es la del scope externo, es decir la de la clase autoPause, y no la del objeto IntersectionObserver, en la rama main le hice bind al handler
    handleIntersection = (entries) => {
        const entry = entries[0];
        console.log(entry);

        entry.isIntersecting ? this.player.media.play(): this.player.media.pause();
        //isIntersecting atributo del objeto observado,que ve si esta fuera del rango o no 
    }
}

export default autoPause;