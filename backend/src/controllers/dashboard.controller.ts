import { Request, Response, NextFunction } from 'express';
import { Appointment } from '../models/Appointment';
import { Inventory } from '../models/Inventory';
import { User, UserRole } from '../models/User';
import { AppError } from '../middleware/error.middleware';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Total Appointments (Confirmed/Completed)
        const totalAppointments = await Appointment.countDocuments({
            status: { $ne: 'Cancelled' }
        });

        // 2. Total Revenue
        // Join with Service to get price
        const revenueStats = await Appointment.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            {
                $lookup: {
                    from: 'services',
                    localField: 'service',
                    foreignField: '_id',
                    as: 'serviceDoc'
                }
            },
            { $unwind: '$serviceDoc' }, // Flatten array
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$serviceDoc.price' }
                }
            }
        ]);
        const totalRevenue = revenueStats.length > 0 ? revenueStats[0].totalRevenue : 0;

        // 3. Low Stock Items (< 5 units)
        const lowStockItems = await Inventory.find({
            stockLevel: { $lt: 5 }
        });

        // 4. Top Stylist
        const topStylistStats = await Appointment.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            {
                $group: {
                    _id: '$stylist',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        let topStylistName = 'N/A';
        if (topStylistStats.length > 0) {
            const stylist = await User.findById(topStylistStats[0]._id);
            if (stylist) topStylistName = stylist.name;
        }

        res.status(200).json({
            status: 'success',
            data: {
                totalRevenue,
                totalAppointments,
                lowStockCount: lowStockItems.length,
                topStylist: topStylistName,
                lowStockItems // Full list for the table
            }
        });

    } catch (error) {
        next(error);
    }
};
