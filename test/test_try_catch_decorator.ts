const userInfo: any = undefined;

function catchError(msg: string) {
  return function (target: any, key: string, decriptor: PropertyDescriptor) {
    const fn = decriptor.value;
    decriptor.value = function () {
      try {
        fn();
      } catch (error) {
        console.error(msg, error);
      }
    };
  };
}

class Test5 {
  @catchError("getName not exist")
  getName() {
    return userInfo.name;
  }

  @catchError("getAge not exist")
  getAge() {
    return userInfo.age;
  }
}

const test5 = new Test5();
test5.getName();
test5.getAge();
