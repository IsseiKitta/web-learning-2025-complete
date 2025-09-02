import { Sequelize } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

// 環境変数からNODE_ENVを取得（未設定の場合は'development'）
const env = "development";

// config.jsonを読み込む
const configPath = path.resolve(__dirname, "config", "config.json");
const configJson = JSON.parse(fs.readFileSync(configPath, "utf8"));
const config = configJson[env];

// 設定がない場合はエラー
if (!config) {
  throw new Error(`環境「${env}」の設定が見つかりません`);
}

// ログに接続情報（パスワードは除く）を表示
console.log(`DB接続設定（${env}環境）:`);
console.log(`- データベース: ${config.database}`);
console.log(`- ユーザー: ${config.username}`);
console.log(`- ホスト: ${config.host}`);
console.log(`- ダイアレクト: ${config.dialect}`);

// Sequelizeインスタンスの作成（config.jsonの設定を使用）
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port || 3306, // portが未指定の場合はデフォルトで3306
    dialect: config.dialect as "mysql",
    logging: console.log, // SQLログを出力（開発時に便利）
    ...config, // その他のconfig.jsonで指定されたオプションをすべて適用
  }
);

// 他ファイルからも使えるようにする
export default sequelize;
