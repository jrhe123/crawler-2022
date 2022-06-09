abstract class Geo {
  private width: number = 123;
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
