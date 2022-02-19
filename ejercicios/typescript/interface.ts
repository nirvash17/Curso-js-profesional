enum Color{
    Rojo = 'rojo',
    Verde = 'verde',
}
interface Rectangulo{ //La interfaz define la forma que tiene un objeto, dando las propiedades del objeto y su tipo
    //No se añaden propiedades mas ni menos, a menos que una sea opcional con '?'
    ancho: number;
    alto:number;
    color?: Color;
}

let rect: Rectangulo = { //Aca se declara un objeto con un tipo de interfaz, cada vez que se hace esto se deben definir todas las propiedades (no opcionales) del objeto
    ancho:4,
    alto:5,
    color: Color.Verde,

}

function area(r:Rectangulo): number { //Recibe un objeto de la interfaz rectangulo solamente
    return r.alto * r.ancho
}

const  areaRect  = area(rect); //NO se puede enviar un objeto que no sea de la interfaz rectaungulo
console.log(areaRect);

rect.toString = function(){ //toString funciona porque todos los objetos heredan esta funcion y aca se le asina que hace
    return this.color?`Un rectangulo ${this.color}`:'Un rectangulo' //this es el rect
}
console.log(rect.toString());
console.log(rect) 