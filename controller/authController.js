// PrismaClientとbcryptをインポート
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
// JWT（ログインセッション管理）用のライブラリも使う
const jwt = require("jsonwebtoken");

// Prisma Clientのインスタンスを作成
const prisma = new PrismaClient();

// サインアップ処理
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // パスワードが入力されているかチェック
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prismaを使ってデータベースに新しいユーザーを作成
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword, // スキーマに合わせてカラム名を変更
      },
    });

    // パスワードハッシュはレスポンスに含めない
    // userオブジェクトからpassword_hashプロパティを取り出し、残りをuserWithoutPasswordに格納する(残余構文)
    const { password_hash, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // メールアドレスやユーザー名が重複している場合のエラー
    if (error.code === "P2002") {
      // Prismaのユニーク制約違反エラーコード
      return res
        .status(409)
        .json({ message: "Username or email already exists." });
    }
    // その他のサーバーエラー
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ログイン処理
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Prismaを使ってメールアドレスでユーザーを検索
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // ユーザーが存在しない、またはパスワードが一致しない場合
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ログイン成功！
    // ここでJWTを生成してクライアントに返す
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // パスワードハッシュはレスポンスに含めない
    const { password_hash, ...userWithoutPassword } = user;
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "strict", //CSRF対策
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
