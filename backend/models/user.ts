import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
