import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { z } from 'zod';
import { SkillLevel } from './User';

// --- Zod Schema ---
// Helper for Consumption Logic
const ConsumableSchema = z.object({
    inventoryItem: z.string(), // ObjectId as string for Zod
    quantityRequired: z.number().positive(),
});

export const ServiceZodSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    durationMins: z.number().positive(), // Duration in minutes
    requiredSkillLevel: z.nativeEnum(SkillLevel),
    consumables: z.array(ConsumableSchema).optional(), // Links to Inventory
});

export type IServiceZod = z.infer<typeof ServiceZodSchema>;

// --- Mongoose Interface ---
export interface IConsumable {
    inventoryItem: Types.ObjectId;
    quantityRequired: number;
}

export interface IService extends Document {
    name: string;
    description?: string;
    price: number;
    durationMins: number;
    requiredSkillLevel: SkillLevel;
    consumables: IConsumable[];

    createdAt: Date;
    updatedAt: Date;
}

// --- Mongoose Schema ---
const ServiceSchema: Schema<IService> = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    durationMins: { type: Number, required: true },
    requiredSkillLevel: {
        type: String,
        enum: Object.values(SkillLevel),
        default: SkillLevel.BASIC
    },

    // CORE LOGIC: Consumption Helper
    // Define what interacts with Inventory when this service is performed
    consumables: [{
        _id: false, // Subdoc doesn't need ID
        inventoryItem: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantityRequired: { type: Number, required: true }
    }]
}, {
    timestamps: true
});

export const Service: Model<IService> = mongoose.model<IService>('Service', ServiceSchema);
