import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String },
    city: { type: String, default: "Gaya" },
    pincode: { type: String, default: "823001" },
    state: { type: String, default: "Bihar" },
    avatar: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    role: { type: String, default: "customer" },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash password with bcryptjs
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.password) return next();
  
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

// Helper to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
