import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  exportCount: number;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  exportCount: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
