import express from "express";
import router from "./router";

const app = express();
// routes
app.use(router);

app.listen(3030, () => {
  console.log("server is running at port " + 3030);
});
