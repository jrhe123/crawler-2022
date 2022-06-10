interface Person {
  name: string;
  age: number;
  gender: string;
}

class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

const teacher = new Teacher({
  name: "roy",
  age: 18,
  gender: "male",
});
const info = teacher.getInfo("name");
console.log("info: ", info);
