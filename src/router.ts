import { Router, Request, Response } from "express";
import path from "path";

import Crawler from "./crawler";
import Analyzer from "./analyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
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
