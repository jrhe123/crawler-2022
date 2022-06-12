import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
// controllers
import "./controller/loginController";
import "./controller/crawlerController";
// router
import { router } from "./router";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req: Request, res: Response, next: NextFunction) => {
  // declared in custom.d.ts
  req.body.username = "this is custom props";
  next();
});
app.use(
  cookieSession({
    name: "session",
    keys: ["this is my super secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
// routes
app.use(router);

app.listen(3030, () => {
  console.log("server is running at port " + 3030);
});
