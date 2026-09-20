import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  sku: { type: String },
  price: { type: Number, default: 0 },
  image: { type: String },
  productId: { type: String },
  sellerName: { type: String },
}, { _id: false });

const TimelineStepSchema = new mongoose.Schema({
  label: { type: String, required: true },
  timestamp: { type: String },
  done: { type: Boolean, default: false },
}, { _id: false });

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String },
    sellerId: { type: String, default: "seller-01" },
    status: {
      type: String,
      default: "placed",
    },
    fulfillmentMode: { type: String, default: "delivery" },
    otp: { type: String, default: "1234" },
    total: { type: Number, required: true },
    subtotal: { type: Number },
    fulfillmentFee: { type: Number, default: 0 },
    paymentMethod: { type: String, default: "UPI (Paid)" },
    customer: {
      userId: { type: String },
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String, default: "" },
      district: { type: String, default: "Gaya" },
      state: { type: String, default: "Bihar" },
      pincode: { type: String },
    },
    items: [OrderItemSchema],
    timeline: [TimelineStepSchema],
    runnerName: { type: String },
    pickupLocation: { type: String },
  },
  { timestamps: true, strict: false }
);

// Clear cached model to allow schema changes in development
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

export default mongoose.model("Order", OrderSchema);
