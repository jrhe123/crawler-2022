import { Router, Request, Response } from "express";
import path from "path";

import Crawler from "./crawler";
import Analyzer from "./analyzer";

const router = Router();

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { password, username } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    return res.json({
      msg: "logged in",
    });
  }
  if (password === "123456" && req.session) {
    req.session.login = true;
    return res.json({
      msg: "logged in",
    });
  } else {
    return res.json({
      msg: "login error",
    });
  }
});

router.get("/logout", (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.login) {
    req.session.login = false;
  }
  return res.json({
    msg: "logout",
  });
});

router.post("/", (req: RequestWithBody, res: Response) => {
  const secret = "this is my super secret";
  const url = `https://laminasolutions.com/services?secure=${secret}`;
  const analyzer = Analyzer.getInstance();
  const crawler = new Crawler(
    url,
    analyzer,
    path.resolve(__dirname, "../data/course.json")
  );
  return res.json({
    msg: "ok",
  });
});

export default router;
