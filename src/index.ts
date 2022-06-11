import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controller/loginController";
import { router } from "./controller/decorator";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  // declared in custom.d.ts
  req.username = "this is custom props";
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
