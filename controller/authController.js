const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

const pool = mysql.createPool({
  host: "db",
  user: "myuser",
  password: "mypassword",
  database: "mydb",
});

// サインアップ処理
const signup = async (req, res) => {};

// ログイン処理
const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const sql = "SELECT * FROM USERS WHERE name = ?";
    const [rows] = await pool.execute(sql, [name]);

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "ユーザ名またはパスワードが違います" });
    }

    const user = rows[0];
    const passwordHash = user.password_hash;

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
      res.redirect("/calender");
    } else {
      return res
        .status(401)
        .json({ message: "ユーザ名またはパスワードが違います" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラー" });
  }
};

module.exports = {
  signup,
  login,
};
