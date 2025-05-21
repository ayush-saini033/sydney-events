"use server"
import { connectDB } from "@/lib/connectDB";
import { User } from "@/lib/user.schema";

export async function RegisterEmail(email: string) {
  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { success: true, message: "User already registered" };
    }

    await User.create({ email });

    return { success: true, message: "User registered successfully" };
  } catch (error: unknown) {
    console.error("RegisterEmail Error:", error);
    return { success: false, message: "Internal server error" };
  }
}
