interface Observer {
    /* Se crea la interfaz observer que tiene el metodo update para actualizar el precio del bitcoin  */
    update: (data: any) => void
}

interface Subject {
    /* Subject tiene 2 metodos que reciben argumentos de tipo Observer para actualizar la cosa */
    subscribe: (observer: Observer) => void
    unsubscribe: (observer: Observer) => void
}


/*  va a recibir los cambios del precio del BC y les va a informar a sus observadores */
/*  La clase implementa a la interface subject, esto define un contrato para la clase, forzandola a definir todos los parametros y metodos de la interface.*/
class BitcoinPrice implements Subject {

    observers: Observer[] = [] /* Arreglo de tipo Observer, para tener observando a todos los suscriptores */

    constructor(){
        const el: HTMLInputElement = document.querySelector("#value")
        el.addEventListener("input", /* El evento input se dispara cuando el contenido en el input cambia */
         () => {
            this.notify(el.value) /* cuando cambie el input notificamos al los observadores */
        })
    }

    subscribe (observer: Observer) {/* Se llama a susbscribe desde la instancia y se añade un observer para esta suscripvcion a la lista de observers */
        this.observers.push(observer) /* observer es una instancia de price display asi que trae el metodo update */
        console.log(`subs :  ${this.observers}`);

    }

    unsubscribe(observer: Observer) {
        /* Al desuscribirse se busca el indice de este usuario en el arreglo y se  le borra */
        const index = this.observers.findIndex((obs) => obs === observer)
        this.observers.splice(index, 1)
    }

    // cuando el precio cambie queremos notificar a los observadores 
    notify(data: any) { 
        console.log(this.observers);
        /* Al cambiar el input, a cada subscriptor se le actualiza la info con el metodo update del observer */
        this.observers.forEach(observer => observer.update(data))
    }
}

class PriceDisplay implements Observer {
    private el: HTMLElement;

    constructor(el: string) {
        this.el = document.querySelector(el); // el elemento ahora es un parámetro
    }

    update(data: any) {
        this.el.innerText = data;
    }
}

const value = new BitcoinPrice();


/* Se crean objtos dsiplay que, pueden alterar su parrafon en el html */
const display1 = new PriceDisplay('#price'); // ahora mandamos el elemento como parámetro
const display2 = new PriceDisplay('#price2');
const display3 = new PriceDisplay('#price3');

const boton1:HTMLElement = document.querySelector('#boton1');
const boton2:HTMLElement = document.querySelector('#boton2');
const boton3:HTMLElement = document.querySelector('#boton3');

/* Se le asigna a cada boton la funcion para subscribir y desusbscribir al hacer click */
boton1.onclick = toggleSub;
boton2.onclick = toggleSub;
boton3.onclick = toggleSub;

/* Array de objetos para cada subscriptor */

interface Subscriptor{
    boton: HTMLElement
    display: PriceDisplay
    subscrito: Boolean
}

const displays:Subscriptor[] = [
    {
        boton:boton1,
        display:display1,
        subscrito: false
    },

    {
        boton:boton2,
        display:display2,
        subscrito: false
    },

    {
        boton:boton3,
        display:display3,
        subscrito: false
    }
]



function toggleSub(event){
    let index:number;

    /* Se encuentra el indice para saber que subscriptor llamo al boton */
    index = displays.findIndex((bt) => {
        console.log(`id botones ${bt.boton.id}`)
        return bt.boton.id === event.srcElement.id
    
    })

    /* Se subscribbe o desuscribe dependiendo de su estado */
    if (!(displays[index].subscrito)){
        value.subscribe(displays[index].display);
        displays[index].boton.innerText = 'Desuscribirse';
    }else{
        value.unsubscribe(displays[index].display);
        displays[index].boton.innerText = 'Suscribirse';

    }

}

