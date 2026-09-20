import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    recipient: { type: String, required: true, index: true },
    code: { type: String, required: true },
    channel: { type: String, enum: ["whatsapp", "email"], default: "whatsapp" },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // Expire in 10 minutes (600 seconds)
  }
);

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
