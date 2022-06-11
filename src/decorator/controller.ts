import { RequestHandler } from "express";
import { router } from "../router";
import { Mehods } from "./request";
/**
 *
 * @param target : constructor method
 */
export function controller(target: new (...args: any[]) => any) {
  for (let key in target.prototype) {
    const path: string = Reflect.getMetadata("path", target.prototype, key);
    const method: Mehods = Reflect.getMetadata("method", target.prototype, key);
    const middleware: RequestHandler = Reflect.getMetadata(
      "middleware",
      target.prototype,
      key
    );
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
