/* Se crea la interface comun que tiene el meotodo a decorar, asi se asegura que tanto componente como decoradores tengal este metodo */
interface Enemy {
    takeDamage(): number;
}


/* Se crea la clase de enemigo base, sin decorar, implementa a enemy, asi que tiene el meotodo takeDamage, en caso de que el componente este sin decorar */
class BaseEnemy implements Enemy {
    takeDamage(): number {
        return 10;
    }
}

/* Se crea el decorardor base, este es el que extenderan todos los decoradores especificos*/
abstract class EnemyDecorator implements Enemy {

    protected enemy: Enemy;
    /*enemy recibe la instancia del componente, decorado o no, por eso debe tener de tipo la interfaz de enemy, si esta decorado tendra enemy la instancia del componente
    decorado anterior, que de por si tiene ya la instancia base sin decorar en su propiedad enemy  */
    constructor(enemy: Enemy) {
        this.enemy = enemy;
    }

    takeDamage(): number {
        return this.enemy.takeDamage();
    }
}
/* Los decoradores especificos extienden de el decorador base, asi heredan su constructor y crean this.enemy que es la instancia base del componente, sin decorar o ya decorado*/
class HelmetDecorator extends EnemyDecorator {

    takeDamage(): number {
        return this.enemy.takeDamage() / 2;
    }
}
class ArmourDecorator extends EnemyDecorator {

    takeDamage(): number {
        /* Cuadno se llama a armourDecorator con la instancia enemyWithHelmet, la llamada de aca abjo hace referencia a la de helmetDecorator, que luego llama a
        la del componente base, por ende los descuentos de daño se acumulan  */
        return this.enemy.takeDamage() / 1.5;
    }
}

let enemy = new BaseEnemy();
console.log('base enemy', enemy);
let enemyWithHelmet = new HelmetDecorator(enemy);
console.log('enemy with helmet', enemyWithHelmet);
let enemyWithHelmetAndArmour = new ArmourDecorator(enemyWithHelmet);
console.log('enemy eith helmet and armour ', enemyWithHelmetAndArmour);
let computedDamaged = enemyWithHelmetAndArmour.takeDamage();
console.log(computedDamaged);