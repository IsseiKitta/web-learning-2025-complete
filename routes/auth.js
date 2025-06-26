// 認証に関するエンドポイント(URL)を設定
// 責務の分離
// 可読性、保守性、テスト性の向上
const router = require("express").Router();
const { login, signup } = require("../controller/authController");
router.post("/login", login);
router.post("/signup", signup);
module.exports = router;
