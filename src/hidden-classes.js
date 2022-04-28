//hidden classes
function Animal(x, y) {
    this.x = x;
    this.y = y;
    //either add properties a and b here, or add properties to each object in same order
}

function printAnimalValues(animal) {
    console.log(`x: ${animal.x} / y: ${animal.y}`);
}

const obj1 = new Animal(1,2);
const obj2 = new Animal(3,4);

//Compiler will 'de-optimize' the code

//a is added first, then b
obj1.a = 65;
obj1.b = 100;

// we want to instantiate object properties in the SAME order that they're declared in the Class

//b is added first, then a
obj2.b = 99;
obj2.a = 10;

// obj1 and obj2 don't share same hidden class now


// should write code that is predictable and does not confuse the compiler

printAnimalValues(obj1);

printAnimalValues(obj2);

