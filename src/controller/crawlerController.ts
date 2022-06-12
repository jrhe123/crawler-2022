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

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

interface Item {
  title: string;
  count: number;
}

interface Data {
  [key: string]: Item[];
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
  index(req: RequestWithBody, res: Response) {
    const result = fs.readFileSync(
      path.resolve(__dirname, "../../data/course.json"),
      "utf8"
    );
    const formatted = JSON.parse(result);
    return res.json(getResponseData<Data>(formatted));
  }

  @post("/")
  @use(checkLogin)
  crawl(req: RequestWithBody, res: Response) {
    const secret = "this is my super secret";
    const url = `https://laminasolutions.com/services?secure=${secret}`;
    const analyzer = Analyzer.getInstance();
    const crawler = new Crawler(
      url,
      analyzer,
      path.resolve(__dirname, "../../data/course.json")
    );
    return res.json(getResponseData<boolean>(true));
  }
}
