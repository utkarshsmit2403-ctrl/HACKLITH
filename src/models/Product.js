import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String },
  colorHex: { type: String },
  size: { type: String },
  sku: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  stock: { type: Number, default: 0 },
  image: { type: String },
}, { _id: false });

const LocationSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number },
  district: { type: String },
  state: { type: String },
  pincode: { type: String },
  address: { type: String },
}, { _id: false });

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    sellerId: { type: String, default: "seller-01" },
    sellerName: { type: String, default: "Artisan Guild Partner" },
    name: { type: String, required: true },
    tagline: { type: String },
    category: { type: String, required: true },
    categoryLabel: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    giTag: { type: String, default: "GI Verified" },
    odopBadge: { type: String, default: "ODOP Certified" },
    rating: { type: Number, default: 4.8 },
    district: { type: String },
    state: { type: String },
    location: LocationSchema,
    distanceKm: { type: Number, default: 3.5 },
    isHyperlocal: { type: Boolean, default: true },
    fulfillmentOptions: { type: mongoose.Schema.Types.Mixed },
    images: {
      primary: { type: String, required: true },
      gallery: [{ type: String }],
    },
    description: { type: String },
    specs: {
      material: { type: String },
      origin: { type: String },
      weave: { type: String },
      weight: { type: String },
    },
    views: { type: Number, default: 0 },
    variants: [VariantSchema],
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
