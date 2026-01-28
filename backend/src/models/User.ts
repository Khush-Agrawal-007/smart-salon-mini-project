import mongoose, { Schema, Document, Model } from 'mongoose';
import { z } from 'zod';

// --- Enums ---
export enum UserRole {
  OWNER = 'Owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}

export enum SkillLevel {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
}

// --- Zod Schemas ---
export const UserZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"), // In production, this would be hashed
  role: z.nativeEnum(UserRole),
  phone: z.string().optional(),
  
  // Staff Specific Fields
  skillLevel: z.nativeEnum(SkillLevel).optional(),
  commissionRate: z.number().min(0).max(100).optional(),
}).refine((data) => {
  // Conditional Validation: Staff must have skillLevel and commissionRate
  if (data.role === UserRole.STAFF) {
    return !!data.skillLevel && data.commissionRate !== undefined;
  }
  return true;
}, {
  message: "Staff members must have a Skill Level and Commission Rate",
  path: ["skillLevel"],
});

export type IUserZod = z.infer<typeof UserZodSchema>;

// --- Mongoose Interface ---
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  
  // Staff Specific
  skillLevel?: SkillLevel;
  commissionRate?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

// --- Mongoose Schema ---
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
  phone: { type: String },
  
  // Staff specific fields - not required for Customers/Owners
  skillLevel: { 
    type: String, 
    enum: Object.values(SkillLevel),
    required: function(this: IUser) { return this.role === UserRole.STAFF; }
  },
  commissionRate: {
    type: Number,
    min: 0,
    max: 100,
    required: function(this: IUser) { return this.role === UserRole.STAFF; }
  }
}, {
  timestamps: true
});

// Explicitly handle type safety for the model
export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
