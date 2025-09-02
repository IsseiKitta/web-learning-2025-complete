import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

// https://sequelize.org/docs/v6/core-concepts/model-basics/
// Usersテーブルに対する操作をUsersモデルで定義する

export class Users extends Model {}
Users.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Users", timestamps: true, updatedAt: false }
  // Sequelizeでは必ずしもモデル名=テーブル名である必要はない。が、わかりやすいので同じにする
);
