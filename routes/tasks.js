const router = require("express").Router();
const verifyToken = require("../middlewares/authMiddleware");

router.use(verifyToken);
