import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SellerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    artisan: { type: String, required: true },
    avatar: { type: String, default: "/images/sunita-devi.jpg" },
    banner: { type: String, default: "/images/sunita-devi-cover.jpg" },
    coverBanner: { type: String, default: "/images/sunita-devi-cover.jpg" },
    gallery: [{ type: String }],
    story: { type: String },
    craftProcess: [
      {
        title: { type: String },
        desc: { type: String },
      }
    ],
    certifications: [{ type: String }],
    awards: [{ type: String }],
    whatsapp: { type: String },
    odopId: { type: String, default: "ODOP-MDH-01" },
    giTag: { type: String, default: "GI Verified" },
    district: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String },
    badgeTier: { type: String, default: "Certified Master Weaver" },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 142 },
    ordersCount: { type: Number, default: 342 },
    viewsCount: { type: Number, default: 3820 },
    monthlySales: { type: Number, default: 84250 },
    verified: { type: Boolean, default: true },
    hyperlocalRunner: { type: Boolean, default: true },
    selfPickupReady: { type: Boolean, default: true },
    memberSince: { type: String, default: "March 2023" },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String },
    gstin: { type: String },
    artisanCardNo: { type: String },
    bio: { type: String },
    bankDetails: {
      accountName: { type: String },
      bankName: { type: String },
      accountNumber: { type: String },
      ifscCode: { type: String },
      branch: { type: String },
      upiId: { type: String },
      verificationStatus: { type: String, default: "Verified" },
    },
    notifications: {
      smsOrders: { type: Boolean, default: true },
      whatsappUpdates: { type: Boolean, default: true },
      emailPayouts: { type: Boolean, default: true },
      lowStockAlerts: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

// Hash password before saving if modified
SellerSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.password) return next();
  
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

// Compare password helper
SellerSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
