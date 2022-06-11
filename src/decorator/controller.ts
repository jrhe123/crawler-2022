import { RequestHandler } from "express";
import { router } from "../router";
import { Mehods } from "./request";
/**
 *
 * @param target : constructor method
 */
export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      const method: Mehods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        "middlewares",
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
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middlewares?.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
