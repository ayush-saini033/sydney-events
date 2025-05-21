import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document{
    email: string
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    }
})

export const User =
  mongoose.models?.User ||
  mongoose.model<IUser>("User", userSchema);