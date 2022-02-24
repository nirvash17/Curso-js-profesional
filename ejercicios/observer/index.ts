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
    private el: HTMLElement

    constructor(){
        this.el = document.querySelector("#price")
    }

    // cada vez que el sujeto notifica a este observador modificamos el valor
    update(data: any) {
        this.el.innerText = data
    }
}

// instancias para suscribirnos al sujeto
const value = new BitcoinPrice()
const display = new PriceDisplay()

value.subscribe(display) // display es una instancia de price display, asi que se llama subscribe con esta
setTimeout(
    () => value.unsubscribe(display),
    5000
)