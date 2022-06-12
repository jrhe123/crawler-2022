import "reflect-metadata";
import { Request, Response } from "express";
//
import { controller, get, post } from "../decorator";
import { getResponseData } from "../utils/util";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller("/")
export class LoginController {
  static isLogin(req: RequestWithBody): boolean {
    const isLogin = req.session ? req.session.login : false;
    return !!isLogin;
  }

  @get("/")
  index(req: RequestWithBody, res: Response) {
    return res.json(getResponseData<string>("this is login route"));
  }

  @get("/isLogin")
  isLogin(req: RequestWithBody, res: Response) {
    const isLogin = LoginController.isLogin(req);
    return res.json(getResponseData<boolean>(isLogin));
  }

  @post("/login")
  login(req: RequestWithBody, res: Response) {
    const { password, username } = req.body;
    const isLogin = LoginController.isLogin(req);
    if (isLogin) return res.json(getResponseData(true));
    if (password === "123456" && req.session) {
      req.session.login = true;
      return res.json(getResponseData<boolean>(true));
    } else {
      return res.json(getResponseData<boolean>(false, "login error"));
    }
  }

  @get("/logout")
  logout(req: RequestWithBody, res: Response) {
    if (req.session && req.session.login) {
      req.session.login = false;
    }
    return res.json(getResponseData<boolean>(true));
  }
}
