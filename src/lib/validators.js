import { z } from "zod";

// Phone validation regex for 10-digit Indian numbers
const phoneRegex = /^[6-9]\d{9}$/;

export const sendOtpSchema = z.object({
  recipient: z.string().min(1, "Recipient phone or email is required"),
  channel: z.enum(["whatsapp", "email"]).default("whatsapp"),
});

export const verifyOtpSchema = z.object({
  recipient: z.string().min(1, "Recipient phone or email is required"),
  code: z.string().length(4, "OTP must be exactly 4 digits"),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().optional(),
  otp: z.string().optional(),
});

export const registerSellerSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  artisanName: z.string().min(2, "Artisan name must be at least 2 characters"),
  phone: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  category: z.string().min(1, "Category is required"),
  odopId: z.string().optional(),
  gstin: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  upiId: z.string().optional(),
});

export const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variant name is required"),
  color: z.string().optional(),
  colorHex: z.string().optional(),
  size: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().optional(),
  stock: z.number().min(0, "Stock cannot be negative"),
  image: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  tagline: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  categoryLabel: z.string().optional(),
  price: z.number().positive("Base price must be greater than 0"),
  originalPrice: z.number().optional(),
  stock: z.number().min(0, "Stock cannot be negative"),
  description: z.string().optional(),
  giTag: z.string().optional(),
  odopBadge: z.string().optional(),
  images: z.object({
    primary: z.string().min(1, "Primary image URL is required"),
    gallery: z.array(z.string()).optional(),
  }),
  specs: z.object({
    material: z.string().optional(),
    origin: z.string().optional(),
    weave: z.string().optional(),
    weight: z.string().optional(),
  }).optional(),
  variants: z.array(variantSchema).optional(),
});

export const orderSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  sellerId: z.string().optional(),
  customer: z.object({
    userId: z.string().optional(),
    name: z.string().min(1, "Customer name is required"),
    phone: z.string().min(5, "Phone number is required"),
    address: z.string().optional().default(""),
    district: z.string().optional().default("Gaya"),
    state: z.string().optional().default("Bihar"),
    pincode: z.string().optional(),
    pinCode: z.string().optional(),
    email: z.string().optional(),
  }).passthrough(),
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number().positive(),
      price: z.number().optional(),
      sku: z.string().optional(),
      image: z.string().optional(),
      productId: z.string().optional(),
      sellerName: z.string().optional(),
      sellerId: z.string().optional(),
    }).passthrough()
  ).min(1, "At least one item is required"),
  total: z.number().min(0),
  subtotal: z.number().optional(),
  fulfillmentFee: z.number().optional(),
  paymentMethod: z.string().optional().default("UPI (Paid)"),
  paymentStatus: z.string().optional(),
  razorpayOrderId: z.string().nullable().optional(),
  razorpayPaymentId: z.string().nullable().optional(),
  otp: z.string().optional(),
  fulfillmentMode: z.string().optional().default("delivery"),
  timeline: z.array(z.any()).optional(),
  pickupLocation: z.string().optional(),
  runnerName: z.string().nullable().optional(),
  runnerPhone: z.string().nullable().optional(),
}).passthrough();

export const uploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  fileType: z.string().min(1, "File content type is required"),
});
