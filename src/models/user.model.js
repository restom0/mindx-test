import mongoose, { Schema } from "mongoose";
import { USER_ROLE } from "../constants/userrole.constant.js";

const UserModel = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: USER_ROLE.USER,
    enum: Object.values(USER_ROLE),
  },
});

export default mongoose.model("User", UserModel);
