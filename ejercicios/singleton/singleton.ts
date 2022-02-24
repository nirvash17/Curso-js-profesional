class singleton{

    private static instance: singleton; /*Static me permite llamar a un metodo o propiead de una clase sin instanciaarla */
    /* Se le asigna el tipo singleton, pues se le asignara el objeto new singleton() */


    private constructor(){ //El constructor es privado, ya que asi no permite que se creen instancias de singleton desde fuera del constructore

    }

    static getInstance() {
        if (!singleton.instance){ /* Se llama a instance sin instanciar gracias a static */
            /*Si se llama a getInstance() por primera vez, se creara una instancia de singleton, que se guardara en singleton.instance,
            luego cuando se vuelva a llamar a getInstance se retornara la clase esxistente, pues singleton.instance que es static tiene almacenada la instancia ya creada */
            singleton.instance = new singleton();
        }

        return singleton.instance;
    }
}


export default singleton;



