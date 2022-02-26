// /* Creo la interface que tiene los metodos del componente que se pueden decorar */
// interface Componente{
//   validate: () => void;
// }

// /* Se crea una clase para el componente base que trae las implementaciones por defecto para el componente*/
// class Field implements Componente{
//   errors : string[]
//   input: HTMLInputElement

//   constructor(input:HTMLInputElement){ /* Inicializo el componente sin decoradores */
//       this.input=input
//       this.errors=[]

//       let errorMessage = document.createElement('p')
//       errorMessage.className='text-danger'
//       this.input.parentNode.insertBefore(errorMessage,this.input.nextSibling)
  
//       this.input.addEventListener('input',()=>{
//           console.log('1',this.validate)
//           this.errors=[]
//           this.validate()
//           errorMessage.innerText=this.errors[0]||''
//       })

//   }
//   /* Funcion a decorar */
//   validate(){
    
//   }
// }

// /* Una clase general para decoradores, todos los decoradores se extienden de esta */
// class Decorador implements Componente{
//   protected componente:Componente;

//   constructor(componente: Componente){
//     this.componente = componente;
//   }
//   validate(): void {
//     this.componente.validate();
//   };
// }

// class RequiredFieldDecorator extends Decorador{
//   value:string;
//   protected componente: Field;
//   protected validate0: any;

//   constructor(componente:Field){
//     super(componente);
//     this.componente = componente;

//   }

//   validate(){
//     this.validate0 = this.componente.validate;
//     this.componente.validate = () => {

//       console.log('2',this.validate0)
//       this.validate0();
//       const value = this.componente.input.value;  
//       if (!value){
//         this.componente.errors.push("Requerido");
//       }
//     }
//     super.validate();
//   }
// }

// class EmailFieldDecorator extends Decorador{
//   value:string;
//   protected componente: Field;
//   protected validate0: any;

//   constructor(componente:Field){
//     super(componente);
//     this.componente = componente;
//   }

//   validate(){
//     this.validate0 = this.componente.validate;

//     this.componente.validate = () => {

//       console.log('3',this.validate0)
//       this.validate0();
//       const value = this.componente.input.value;
//       if (!value.includes('@') ){
//         this.componente.errors.push("Debe ser un email");
//       }
//     }
//     super.validate();

//   }
// }

// const field = new Field(document.querySelector('#email'))
// const decorador1 = new RequiredFieldDecorator(field);
// const decorador2 = new EmailFieldDecorator(field);
// decorador1.validate();

// decorador2.validate();



