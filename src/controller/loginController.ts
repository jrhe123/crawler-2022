import path from "path";
import "reflect-metadata";
import { Request, Response } from "express";
//
import { controller, get, post } from "./decorator";
import { getResponseData } from "../utils/util";
//
import Crawler from "../utils/crawler";
import Analyzer from "../utils/analyzer";

export interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller
class LoginController {
  @get("/")
  index(req: RequestWithBody, res: Response) {
    return res.json(getResponseData("this is index route"));
  }

  @post("/login")
  login(req: RequestWithBody, res: Response) {
    const { password, username } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      return res.json(getResponseData(true));
    }
    if (password === "123456" && req.session) {
      req.session.login = true;
      return res.json(getResponseData(true));
    } else {
      return res.json(getResponseData(false, "login error"));
    }
  }

  @post("/crawl")
  crawl(req: RequestWithBody, res: Response) {
    const secret = "this is my super secret";
    const url = `https://laminasolutions.com/services?secure=${secret}`;
    const analyzer = Analyzer.getInstance();
    const crawler = new Crawler(
      url,
      analyzer,
      path.resolve(__dirname, "../data/course.json")
    );
    return res.json(getResponseData(true));
  }

  @get("/logout")
  logout(req: RequestWithBody, res: Response) {
    if (req.session && req.session.login) {
      req.session.login = false;
    }
    return res.json(getResponseData(true));
  }
}
