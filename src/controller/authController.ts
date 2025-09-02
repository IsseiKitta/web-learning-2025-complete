// import bcrypt from "bcryptjs";
// import { Request, Response } from "express";
// import { RowDataPacket } from "mysql2";
// import { pool } from "../db";
// import sequelize from "../../db";

// // --- ログイン処理 ---
// // 1.ログインフォームからデータを受け取る -> 2.そのデータをもとにデータベースに問い合わせる -> 3.正しいデータが返ってきたらログイン成功という流れ
// export const login = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // フォーム送信を受け取る
//     const { name, password } = req.body;

//     // クエリの定義と実行
//     const sql = "SELECT * FROM USERS WHERE name = ?";
//     const [rows] = await pool.execute<RowDataPacket[]>(sql, [name]);

//     // クエリに合うデータがUSERSテーブルに存在しない場合
//     if (rows.length === 0) {
//       res.status(401).json({ message: "ユーザ名またはパスワードが違います" });
//       return;
//     }

//     const user = rows[0];
//     const passwordHash = user.password_hash;

//     const match: boolean = await bcrypt.compare(password, passwordHash);

//     if (!match) {
//       res.status(401).json({ message: "ユーザ名またはパスワードが違います" });
//       return;
//     }

//     // ここまで到達すればログイン成功と判断。/calenderにリダイレクトする
//     res.redirect("/calender");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "サーバーエラー" });
//   }
// };
