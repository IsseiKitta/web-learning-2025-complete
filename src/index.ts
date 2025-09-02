import express, { Request, Response } from "express";
import path from "path";
// import authRouter from "./routes/auth";
import pageRouter from "./routes/pages";
import sequelize from "../sequelize/db";
import appRoot from "app-root-path";
// モデルをインポート
import "../sequelize/models/Users";
import "../sequelize/models/Tasks";

// このappがアプリケーションの本体
const app = express();

// フォーム送信を受け取るため
app.use(express.urlencoded({ extended: true }));
// JSON形式のリクエストをぱーすしてres.bodyで使えるようにするため。inputタグのname属性がres.bodyのキーになる
app.use(express.json());
// publicディレクトリ内のファイルを静的ファイルとして公開する
app.use(express.static(path.join(appRoot.path, "public")));

// --- テンプレートエンジンの設定 ---
app.set("view engine", "ejs");
app.set("views", appRoot.resolve("src/views"));

// --- ルーティングの設定。パスに応じてリクエストを適切な処理に振り分ける ---
// app.use(authRouter);
app.use(pageRouter);

// --- サーバー起動用の async 関数 ---
// トップレベルの非同期処理は禁止されてるため

// NOTE: // nodemonがdistの変更を検知して再起動してるっぽい

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("DBへの接続が成功しました");

    await sequelize.sync({ force: true }); // 既存のテーブルを削除して再作成（force:trueは開発時のみ！）
    console.log("テーブルが作成されました");

    app.listen(3000, () => {
      console.log("サーバーはポート3000で起動しました");
    });
  } catch (err) {
    console.error("サーバーの起動に失敗しました:\n", err);
  }
}

// サーバー起動
startServer();

export default app;
