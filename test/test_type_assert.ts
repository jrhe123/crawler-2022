interface Bird {
  fly: boolean;
  sing: () => void;
}

interface Dog {
  fly: boolean;
  bark: () => void;
}

/**
 * use "as"
 */
function f1(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
}

/**
 * use "in"
 */
function f2(animal: Bird | Dog) {
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

/**
 * use typeof
 */
function f3(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}

/**
 * use instanceof
 */
class NumberObj {
  value: number;
}

function f4(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.value + second.value;
  }
  return 0;
}
