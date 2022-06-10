/**
 * Generic class
 */
class DataManager<T> {
  constructor(public data: T[]) {}

  getItem(index: number): T {
    return this.data[index];
  }
}

const dataManager = new DataManager<number>([1, 2, 3]);
const item = dataManager.getItem(1);

/**
 * Generic func
 */
const func1: <T>(param: T) => T = <T>(param: T) => {
  return param;
};
