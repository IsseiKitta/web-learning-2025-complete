import { Router, Request, Response } from "express";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.get("/mypage", (req: Request, res: Response) => {
  res.render("taskList");
});

router.get("/edit", (req: Request, res: Response) => {
  res.render("taskEdit");
});

export default router;
