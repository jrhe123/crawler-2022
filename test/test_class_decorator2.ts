function testDecorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "roytest";
      getName() {
        return this.name;
      }
    };
  };
}

const Test = testDecorator()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

const test = new Test("abc");
console.log("get name: ", test.getName());
