import { model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(providedPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (providedPassword: string) {
  return await bcrypt.compare(providedPassword, this.password);
};

const User = model("User", userSchema);

export default User;
