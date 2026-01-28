import { Request, Response, NextFunction } from 'express';
import { Appointment, AppointmentZodSchema } from '../models/Appointment';
import { Service } from '../models/Service';
import { Inventory } from '../models/Inventory';
import { User, UserRole, SkillLevel } from '../models/User';
import { AppError } from '../middleware/error.middleware';

export const createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // 1. Validate Input with Zod
        // extracting only fields needed for creation
        const { customer, stylist, service, startTime, endTime, notes } = req.body;

        // We validate the raw body. 
        // Note: Zod schema expects dates for startTime/endTime. 
        // In a real request, they come as strings, so we use `z.coerce.date()` in the schema (already done).
        const validatedData = AppointmentZodSchema.parse(req.body);

        // 2. Validate Service Existence
        const serviceDoc = await Service.findById(service);
        if (!serviceDoc) {
            return next(new AppError('Service not found', 404));
        }

        // 3. Validate Stylist Existence & Role
        const stylistDoc = await User.findById(stylist);
        if (!stylistDoc) {
            return next(new AppError('Stylist not found', 404));
        }
        if (stylistDoc.role !== UserRole.STAFF) {
            return next(new AppError('Selected user is not a staff member', 400));
        }

        // 4. (Optional Complex Logic) Validate Skill Match
        // Does the stylist have the required skill level?
        // Map levels to numbers for comparison: Basic=1, Intermediate=2, Expert=3
        const skillHierarchy: Record<string, number> = {
            [SkillLevel.BASIC]: 1,
            [SkillLevel.INTERMEDIATE]: 2,
            [SkillLevel.EXPERT]: 3,
        };

        const requiredLevel = skillHierarchy[serviceDoc.requiredSkillLevel as string] || 1;
        const stylistSkill = stylistDoc.skillLevel || SkillLevel.BASIC;
        const stylistLevel = skillHierarchy[stylistSkill as string] || 1;

        if (stylistLevel < requiredLevel) {
            return next(new AppError(
                `Stylist does not meet the required skill level (${serviceDoc.requiredSkillLevel}) for this service.`,
                400
            ));
        }

        // 5. Check Availability (Prevent Overlap)
        // Overlapping logic: (StartA < EndB) and (EndA > StartB)
        const existingAppointment = await Appointment.findOne({
            stylist: stylist,
            $or: [
                { startTime: { $lt: validatedData.endTime }, endTime: { $gt: validatedData.startTime } }
            ],
            status: { $ne: 'Cancelled' }
        });

        if (existingAppointment) {
            return next(new AppError('Stylist is already booked for this time slot', 409));
        }

        // 6. Smart Inventory Deduction
        // Check if service requires consumables
        if (serviceDoc.consumables && serviceDoc.consumables.length > 0) {
            // Validate stock for ALL items first
            for (const item of serviceDoc.consumables) {
                // Use top-level Inventory import
                const inventoryItem = await Inventory.findById(item.inventoryItem);

                if (!inventoryItem) {
                    return next(new AppError(`Inventory item not found for this service`, 500));
                }

                if (inventoryItem.stockLevel < item.quantityRequired) {
                    return next(new AppError(
                        `Insufficient inventory: ${inventoryItem.itemName} (Required: ${item.quantityRequired} ${inventoryItem.unit}, Available: ${inventoryItem.stockLevel})`,
                        409
                    ));
                }
            }

            // Deduct Stock
            for (const item of serviceDoc.consumables) {
                const inventoryItem = await Inventory.findById(item.inventoryItem);
                if (inventoryItem) {
                    inventoryItem.stockLevel -= item.quantityRequired;
                    await inventoryItem.save();
                }
            }
        }

        // 6. Create Appointment
        const newAppointment = await Appointment.create({
            customer: validatedData.customer,
            stylist: validatedData.stylist,
            service: validatedData.service,
            startTime: validatedData.startTime,
            endTime: validatedData.endTime,
            ...(validatedData.notes ? { notes: validatedData.notes } : {}),
            status: 'Pending' // Default
        });

        res.status(201).json({
            status: 'success',
            data: {
                appointment: newAppointment
            }
        });

    } catch (error) {
        next(error);
    }
};
