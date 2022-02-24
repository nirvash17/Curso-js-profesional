import singleton from './singleton';

const a = singleton.getInstance();
const b = singleton.getInstance()

console.log(`A es igual a B? ${a === b}`);
console.log(a, b)

