// normal method: target is prototype
// static method: target is constructor

function getNameDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log("target: ", target);
  console.log("key: ", key);
  // descriptor.writable = false
}

class Test3 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test3 = new Test3("roy");
console.log(test3.getName());
