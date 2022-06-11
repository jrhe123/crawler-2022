function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    return "123";
  };
}

@testDecorator
class Test {}

const test = new Test();
(test as any).getName();
