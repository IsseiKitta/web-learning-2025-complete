const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/mypage", (req, res) => {
  res.render("calender");
});

module.exports = router;
