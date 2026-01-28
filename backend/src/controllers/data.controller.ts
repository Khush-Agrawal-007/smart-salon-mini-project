import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';
import { User, UserRole } from '../models/User';

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const services = await Service.find({}, 'name price durationMins requiredSkillLevel');
        res.status(200).json({
            status: 'success',
            results: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

export const getStylists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stylists = await User.find({ role: UserRole.STAFF }, 'name skillLevel');
        res.status(200).json({
            status: 'success',
            results: stylists.length,
            data: stylists
        });
    } catch (error) {
        next(error);
    }
};

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // In production, we wouldn't dump all customers, but for prototype:
        const customers = await User.find({ role: UserRole.CUSTOMER }, 'name email');
        res.status(200).json({
            status: 'success',
            results: customers.length,
            data: customers
        });
    } catch (error) {
        next(error);
    }
};
