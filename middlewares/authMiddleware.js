const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // ブラウザが自動で送ってくれたクッキーからトークンを取得
  const token = req.cookies.authToken;

  // トークンが存在しない場合
  if (!token) {
    // 401 Unauthorized: 認証されていない
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    // トークンが有効か検証する
    // process.env.JWT_SECRET の部分は、あなたがトークン生成時に使った秘密鍵と同じものを指定
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ★重要：デコードされた情報（ユーザーIDなど）をリクエストオブジェクトに追加する
    // これにより、後続のコントローラーで `req.user` としてユーザー情報にアクセスできる
    req.user = decoded;

    // 次のミドルウェアまたはルートハンドラに進む
    next();
  } catch (error) {
    // トークンが無効な場合（改ざんされている、有効期限切れなど）
    // 400 Bad Request または 403 Forbidden が適切
    return res.status(400).json({ message: "Invalid Token." });
  }
};

module.exports = verifyToken;
