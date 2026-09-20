import mongoose from "mongoose";

const ReturnSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    productName: { type: String, required: true },
    variant: { type: String },
    reason: { type: String, required: true },
    comments: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "replaced", "refunded"],
      default: "pending",
    },
    refundAmount: { type: Number, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Return || mongoose.model("Return", ReturnSchema);
