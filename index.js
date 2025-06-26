const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks");
const pagesRouter = require("./routes/pages");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authization"],
  })
);

app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/", pagesRouter);
//app.use("/task", taskRouter);

app.listen(port, () => {
  console.log(`サーバーはポート${port}で起動しました`);
});

module.exports = app;
