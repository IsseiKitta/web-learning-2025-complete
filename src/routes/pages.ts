import { Router, Request, Response } from "express";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

router.get("/mypage", (req: Request, res: Response) => {
  res.render("taskList");
});

router.get("/taskedit", (req: Request, res: Response) => {
  res.render("taskEdit");
});

router.get("/taskadd", (req: Request, res: Response) => {
  res.render("taskAdd");
});

export default router;
