abstract class Geo {
  width: number;
  getType() {
    return "implemented method";
  }
  abstract getArea(): number;
}

class Circle extends Geo {
  getArea(): number {
    return 123;
  }
}

class Square extends Geo {
  getArea(): number {
    return 321;
  }
}
