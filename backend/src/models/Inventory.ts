import mongoose, { Schema, Document, Model } from 'mongoose';
import { z } from 'zod';

// --- Zod Schema ---
export const InventoryZodSchema = z.object({
    itemName: z.string().min(2),
    sku: z.string().min(3, "SKU must be unique and valid"),
    stockLevel: z.number().min(0),
    unit: z.string(), // e.g., 'ml', 'bottles', 'packs'
    reorderPoint: z.number().min(0),
    costPerUnit: z.number().min(0).optional(),
    expiryDate: z.coerce.date().optional(),
});

export type IInventoryZod = z.infer<typeof InventoryZodSchema>;

// --- Mongoose Interface ---
export interface IInventory extends Document {
    itemName: string;
    sku: string;
    stockLevel: number;
    unit: string;
    reorderPoint: number;
    costPerUnit?: number;
    expiryDate?: Date;

    createdAt: Date;
    updatedAt: Date;
}

// --- Mongoose Schema ---
const InventorySchema: Schema<IInventory> = new Schema({
    itemName: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    stockLevel: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true }, // e.g., "ml" for Hair Dye
    reorderPoint: { type: Number, default: 10 }, // Alert when stock is low
    costPerUnit: { type: Number },
    expiryDate: { type: Date }
}, {
    timestamps: true
});

export const Inventory: Model<IInventory> = mongoose.model<IInventory>('Inventory', InventorySchema);
