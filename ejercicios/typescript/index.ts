//Entiendo que tipar adecuadamente cada variable,  ahorra memoria y mejora la performance

//bolean
let muted:boolean = true; //En ts puedo indicar el tipo de una variable
muted = false; //Si luego a muted le asigno algo que no sea boleano dara error

//numeros
let age = '6';
let numerador:number = 42;
let denominador = 6; //Si a denominador le asigo 'age', que es string, dara error
let resultado = numerador/denominador;

//string
let nombre:string = 'kel';
let saludo = `Me llamo ${nombre}`

//Arreglos
let people: string[] = []; //Tambien puedo asignar a que los arreglos sean de un solo tipo
people = ["isabel", "carol", "lili"];//Solo strings
people.push("jen"); //Si agrego algo que no sea string dara error

let peopleAndNumbers: Array<string | number> = []; //Pero tambien puedo hacer que un string tenga mas de un tipo
peopleAndNumbers.push("Syl");
peopleAndNumbers.push(16); //Aca si agreego numbers o strings no dara error

//Enum
enum Color{  //Se puede usar enum para crear 'pseudo-tipo' de variables
    rojo = 'rojo', //Si no le asigno valor a los elementos de Color, solo devolvera el indice
    verde = 'verde',//Deben tener todos o ninguno un valor
    azul = 'azul',
}

let colorFavorito:Color = Color.verde; //Luego si a una variable le asigo el tipo 'Color', solo puedo asiganrle valores de color como se muestra aca
console.log(`Mi color favorito es ${colorFavorito}`)

let comodin:any = 'joker'; //Con any, le digo a una variable que reciba cualquier tipo
comodin = { type: 'Wild'}

//Object
let someObject: object = {type: 'wildCard'}