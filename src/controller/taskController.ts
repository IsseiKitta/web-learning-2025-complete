// import { pool } from "../db";
// import { RowDataPacket } from "mysql2";
// import { Request, Response } from "express";

// export const getTask = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const sql = "SELECT * FROM TASKS";
//     const [rows] = await pool.execute<RowDataPacket[]>(sql);
//     res.json(rows);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "サーバーエラー" });
//   }
// };

// // TODO: pool.query使う
// export const addTask = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, description, due_date } = req.body;
//   } catch (err) {}
// };

// export const deleteTask = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {};

// export const updateTask = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {};

// export const toggleTaskComplete = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {};
