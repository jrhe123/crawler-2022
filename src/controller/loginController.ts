import "reflect-metadata";
import { Router, Request, Response } from "express";
import { RequestWithBody } from "../router";
import { controller, get } from "./decorator";

@controller
class LoginController {
  @get("/")
  home(req: RequestWithBody, res: Response) {
    return res.json({
      msg: "this is index route",
    });
  }
}
