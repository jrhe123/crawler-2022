import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// routes
app.use(router);

app.listen(3030, () => {
  console.log("server is running at port " + 3030);
});
