import { CrawlerController, LoginController } from "../controller";
type controller = CrawlerController | LoginController;

export enum Mehods {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
/**
 *
 * @param target : controller
 */
function getRequestDecorator(type: Mehods) {
  return function (path: string) {
    return function (target: controller, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Mehods.get);
export const post = getRequestDecorator(Mehods.post);
export const put = getRequestDecorator(Mehods.put);
export const del = getRequestDecorator(Mehods.delete);
