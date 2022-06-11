import { Router } from "express";
export const router = Router();

enum Mehod {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export function controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Mehod = Reflect.getMetadata("method", target.prototype, key);
    const handler = target.prototype[key];
    /**
     * path: "/", "/login", etc..
     * method: get / post
     * handler:
     */
    if (path && method && handler) {
      router[method](path, handler);
    }
  }
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator("get");
export const post = getRequestDecorator("post");
export const put = getRequestDecorator("put");
export const del = getRequestDecorator("delete");
