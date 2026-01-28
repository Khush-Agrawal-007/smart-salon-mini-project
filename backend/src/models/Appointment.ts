import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { z } from 'zod';

// --- Enums ---
export enum AppointmentStatus {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
}

// --- Zod Schema ---
export const AppointmentZodSchema = z.object({
    customer: z.string(), // ObjectId
    stylist: z.string(),  // ObjectId
    service: z.string(),  // ObjectId
    startTime: z.coerce.date(), // Auto-convert strings to Date
    endTime: z.coerce.date(),
    status: z.nativeEnum(AppointmentStatus).optional(),
    notes: z.string().optional(),
}).refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
});

export type IAppointmentZod = z.infer<typeof AppointmentZodSchema>;

// --- Mongoose Interface ---
export interface IAppointment extends Document {
    customer: Types.ObjectId; // Ref to User (Role: Customer)
    stylist: Types.ObjectId;  // Ref to User (Role: Staff)
    service: Types.ObjectId;  // Ref to Service
    startTime: Date;
    endTime: Date;
    status: AppointmentStatus;
    notes?: string;

    createdAt: Date;
    updatedAt: Date;
}

// --- Mongoose Schema ---
const AppointmentSchema: Schema<IAppointment> = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stylist: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },

    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },

    status: {
        type: String,
        enum: Object.values(AppointmentStatus),
        default: AppointmentStatus.PENDING,
        index: true
    },
    notes: { type: String }
}, {
    timestamps: true
});

// Compound Index: Prevent double booking a stylist
AppointmentSchema.index({ stylist: 1, startTime: 1 }, { unique: true });

export const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
