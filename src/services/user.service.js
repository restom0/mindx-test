import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const loginUser = async (username, password) => {
  const user = await UserModel.findOne({ username, role: "user" });
  if (!user) {
    throw new Error("User not found");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error("Invalid password or username");
  }
  return generateToken(user._id);
};
const registerUser = async (username, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ username, password: hashPassword });
  await user.save();
  return user;
};
const loginAdmin = async (username, password) => {
  const user = await UserModel.findOne({ username, role: "admin" });
  if (!user) {
    throw new Error("User not found");
  }
  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error("Invalid password or username");
  }
  return user;
};

const findUserById = async (id) => {
  return await UserModel.findById(Types.ObjectId.createFromHexString(id));
};
export default {
  loginUser,
  registerUser,
  loginAdmin,
  findUserById,
};
