import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Tasks extends Model {}
Tasks.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // 必要に応じて正しいテーブル名に変更
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Tasks", timestamps: true }
);
