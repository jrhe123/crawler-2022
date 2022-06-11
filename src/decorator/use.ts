import { RequestHandler } from "express";
import { CrawlerController, LoginController } from "../controller";

type controller = CrawlerController | LoginController;
/**
 *
 * @param target : controller
 */
export function use(middleware: RequestHandler) {
  return function (target: controller, key: string) {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
