function testDecorator2() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "roytest";
      getName() {
        return this.name;
      }
    };
  };
}

const Test2 = testDecorator2()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test2 = new Test2("abc");
console.log("get name: ", test2.getName());
