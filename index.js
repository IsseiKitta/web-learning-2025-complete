const express = require("express");
const path = require("path");
const authRouter = require("./routes/auth");
const pageRouter = require("./routes/pages");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

-app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(authRouter);
app.use(pageRouter);

// --- サーバー起動 ---
app.listen(3000, () => {
  console.log(`サーバーはポート3000で起動しました`);
});
