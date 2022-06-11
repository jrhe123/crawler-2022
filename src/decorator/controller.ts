import { router } from "../router";

enum Mehods {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Mehods = Reflect.getMetadata("method", target.prototype, key);
    const middleware = Reflect.getMetadata("middleware", target.prototype, key);
    const handler = target.prototype[key];
    /**
     * path: "/", "/login", etc..
     * method: get / post
     * handler:
     */
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}
