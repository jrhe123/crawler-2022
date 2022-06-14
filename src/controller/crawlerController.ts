import fs from "fs";
import path from "path";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
//
import { controller, use, get, post } from "../decorator";
import { getResponseData } from "../utils/util";
//
import Crawler from "../utils/crawler";
import Analyzer from "../utils/analyzer";
// DB
import { prepareConnection } from "../db";
import { User } from "../entity";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

/**
 * Middleware: check login or not
 */
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    return res.json(getResponseData(false, "Not authorized"));
  }
};
const dummyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};

@controller("/crawler")
export class CrawlerController {
  @get("/")
  @use(checkLogin)
  @use(dummyMiddleware)
  showData(req: RequestWithBody, res: Response) {
    try {
      const result = fs.readFileSync(
        path.resolve(__dirname, "../../data/course.json"),
        "utf8"
      );
      const formatted = JSON.parse(result) || {};
      return res.json(getResponseData<responseResult.showData>(formatted));
    } catch (error) {
      return res.json(
        getResponseData<responseResult.showData>(false, "not exist")
      );
    }
  }

  @post("/")
  @use(checkLogin)
  getData(req: RequestWithBody, res: Response) {
    const secret = "this is my super secret";
    const url = `https://laminasolutions.com/services?secure=${secret}`;
    const analyzer = Analyzer.getInstance();
    const crawler = new Crawler(
      url,
      analyzer,
      path.resolve(__dirname, "../../data/course.json")
    );
    return res.json(getResponseData<responseResult.getData>(true));
  }

  @get("/test")
  async test(req: RequestWithBody, res: Response) {
    const db = await prepareConnection();
    const userRepo = db.getRepository(User);
    const user = userRepo.findOneBy({
      userGUID: "309559A9-3FA0-4241-95ED-D577A1D27248",
    });
    console.log("user: ", user);
    return res.json(getResponseData<string>("hit here"));
  }
}
