import { RequestHandler } from "express";
import { CrawlerController, LoginController } from "../controller";

type controller = CrawlerController | LoginController;
/**
 *
 * @param target : controller
 */
export function use(middleware: RequestHandler) {
  return function (target: controller, key: string) {
    const currentMiddlewares =
      Reflect.getMetadata("middlewares", target, key) || [];
    currentMiddlewares.push(middleware);
    Reflect.defineMetadata("middlewares", currentMiddlewares, target, key);
  };
}
