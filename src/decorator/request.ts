enum Mehods {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
function getRequestDecorator(type: Mehods) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Mehods.get);
export const post = getRequestDecorator(Mehods.post);
export const put = getRequestDecorator(Mehods.put);
export const del = getRequestDecorator(Mehods.delete);
