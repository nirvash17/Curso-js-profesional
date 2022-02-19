function add(a:number, b:number): number{ /* Tambien le puedo asignar a la funcion, el tipo del valor que retorna y no podra retornar otro tipo */
    return 67;
}

const sum = add(4, 6);/* Al poner el cursor sobre add, se ve que tipos recibe y cuales retorna, esto es practico a la hora de usar modulos impportados*/

function createAdder(a:number): (arg0: number) => number { /* Se le dice que retorna una funcion que recibe y retorna un numero */
    return function(b:number){
        return a+b;
    }
}


const addFour = createAdder(4);
const fourPlus6 = addFour(6);


//A la fucnion se le puede asignar un valor por defecto a un parametro, o con el sigo ?, decirle que no es obligatorio, puede ser undefined
function fullName(firstName: string = 'Richy', lastName?: string): string{
    return `${firstName} ${lastName}`
}

const richard = fullName('Richard')