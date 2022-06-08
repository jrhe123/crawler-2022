class Person {
  constructor(public name: string) {}
}

class Teacher extends Person {
  nickname: string;
  constructor() {
    super("person");
    this.nickname = super.name + " teacher";
  }
}

const teacher = new Teacher();
teacher.nickname;
