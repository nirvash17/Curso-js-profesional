
/* En este ejemplo el profesor usa el decorador de manera mas simple */

/* Se crea el componente base a decorar */
class Field {
    errors: string[];
    input: HTMLInputElement;
  
    constructor(input: HTMLInputElement) {
      this.input = input;
      this.errors = [];
  
      let errorMessage = document.createElement('p');
      errorMessage.className = 'text-danger';
      /* Situa un elemento <p> debajo del input */
      this.input.parentNode.insertBefore(errorMessage, this.input.nextSibling);
  
      /* Agrega un escuchador de eventos que se dipara cada vez que se tipea en el input */
      this.input.addEventListener('input', () => {
        this.errors = [];
        this.validate(); /* el listener llama a validate para que cheque errores y los añade al elemento <p>*/
        errorMessage.innerText = this.errors[0] || '';
      });
    }
  
    validate() {
    }
  }
  
  /* Inicia de una el decorador, sin decorador base */
  function RequiredFieldDecorator(field: Field): Field {
    /* Guarda el estado inicial de la funcion validate, esto para evitar que se bloquee el codiga con llamadas recursivas infinitas */
    let validate = field.validate;
  
    field.validate = function() {
      /* Se ejecuta el estado inicial de la funcion, por si hay otros decoradores */
      validate();
      /* Se añade la verificacion a la funcion validate */
      let value = field.input.value;
      if (!value) {
        field.errors.push('Requerido');
      }
    };
  
    return field;
  }
  
  function EmailFieldDecorator(field: Field): Field {
    let validate = field.validate;
  
    field.validate = function() {
      validate();
      let value = field.input.value;
  
      if (value.indexOf('@') === -1) {
        field.errors.push('Debe ser un email');
      }
    };
  
    return field;
  }
  
  let field = new Field(document.querySelector('#email'));
  /* Se llama a la funciones decoradores con elobjeto del componente para sumar decoraciones */
  field = RequiredFieldDecorator(field);
  field = EmailFieldDecorator(field);
  