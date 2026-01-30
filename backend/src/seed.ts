import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, UserRole, SkillLevel } from './models/User';
import { Service } from './models/Service';
import { Inventory } from './models/Inventory';
import { Appointment } from './models/Appointment';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/smart-salon';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('✅ Connected to MongoDB for Seeding');

        // 1. Clear Data
        await User.deleteMany({});
        await Service.deleteMany({});
        await Inventory.deleteMany({});
        await Appointment.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // 2. Create rich Inventory
        const redDye = await Inventory.create({ itemName: 'Matrix SoColor Red', sku: 'DYE-RED-001', stockLevel: 120, unit: 'ml', reorderPoint: 500, costPerUnit: 0.5, expiryDate: new Date('2026-12-31') });
        const blueDye = await Inventory.create({ itemName: 'Electric Blue Dye', sku: 'DYE-BLU-001', stockLevel: 800, unit: 'ml', reorderPoint: 200, costPerUnit: 0.6, expiryDate: new Date('2027-06-30') });
        const shampoo = await Inventory.create({ itemName: 'Premium Argan Shampoo', sku: 'SHAM-ARG-001', stockLevel: 100, unit: 'bottles', reorderPoint: 10, costPerUnit: 15, expiryDate: new Date('2028-01-15') });
        const keratin = await Inventory.create({ itemName: 'Gold Keratin Tub', sku: 'TRT-KER-001', stockLevel: 5, unit: 'tubs', reorderPoint: 8, costPerUnit: 150, expiryDate: new Date('2026-08-20') }); // LOW STOCK
        const beardOil = await Inventory.create({ itemName: 'Sandalwood Beard Oil', sku: 'GRO-OIL-001', stockLevel: 50, unit: 'bottles', reorderPoint: 15, costPerUnit: 25, expiryDate: new Date('2029-01-01') });
        const faceMask = await Inventory.create({ itemName: 'Charcoal Face Mask', sku: 'SKIN-MSK-001', stockLevel: 200, unit: 'packets', reorderPoint: 50, costPerUnit: 5, expiryDate: new Date('2026-05-15') });

        console.log('📦 Inventory created with Expiry Dates');

        // 3. Create Users (Staff & Customer)
        const owner = await User.create({ name: 'Khushi Admin', email: 'owner@salon.com', password: 'password123', role: UserRole.OWNER });

        // Expanded Staff List
        const alice = await User.create({ name: 'Alice Styles', email: 'alice@salon.com', password: 'password123', role: UserRole.STAFF, skillLevel: SkillLevel.EXPERT, commissionRate: 40 });
        const bob = await User.create({ name: 'Bob Cutter', email: 'bob@salon.com', password: 'password123', role: UserRole.STAFF, skillLevel: SkillLevel.BASIC, commissionRate: 20 });
        const elena = await User.create({ name: 'Elena Vogue', email: 'elena@salon.com', password: 'password123', role: UserRole.STAFF, skillLevel: SkillLevel.EXPERT, commissionRate: 50 }); // Director
        const davina = await User.create({ name: 'Davina Smooth', email: 'davina@salon.com', password: 'password123', role: UserRole.STAFF, skillLevel: SkillLevel.INTERMEDIATE, commissionRate: 30 }); // Spa Specialist
        const mike = await User.create({ name: 'Mike Razor', email: 'mike@salon.com', password: 'password123', role: UserRole.STAFF, skillLevel: SkillLevel.INTERMEDIATE, commissionRate: 30 }); // Barber

        const demoCustomer = await User.create({ name: 'Demo Customer', email: 'demo@customer.com', password: 'password123', role: UserRole.CUSTOMER });

        console.log('👥 Users created (5 Stylists)');

        // 4. Create Services
        await Service.create({ name: 'Luxury Hair Dye', description: 'Full head coloring with premium organic dye.', price: 150, durationMins: 90, requiredSkillLevel: SkillLevel.EXPERT, consumables: [{ inventoryItem: redDye._id, quantityRequired: 100 }] });
        await Service.create({ name: 'Basic Haircut', description: 'Standard trim and styling.', price: 30, durationMins: 30, requiredSkillLevel: SkillLevel.BASIC, consumables: [] });
        await Service.create({ name: 'Wash & Blow Dry', description: 'Relaxing wash with premium shampoo.', price: 45, durationMins: 45, requiredSkillLevel: SkillLevel.BASIC, consumables: [{ inventoryItem: shampoo._id, quantityRequired: 1 }] });

        // New Services
        await Service.create({ name: 'Keratin Treatment', description: 'Smoothing treatment for frizz-free hair.', price: 250, durationMins: 120, requiredSkillLevel: SkillLevel.EXPERT, consumables: [{ inventoryItem: keratin._id, quantityRequired: 1 }] });
        await Service.create({ name: 'Beard Grooming', description: 'Shape up and oil treatment.', price: 40, durationMins: 30, requiredSkillLevel: SkillLevel.INTERMEDIATE, consumables: [{ inventoryItem: beardOil._id, quantityRequired: 1 }] });
        await Service.create({ name: 'Charcoal Detox Facial', description: 'Deep cleansing face mask.', price: 75, durationMins: 60, requiredSkillLevel: SkillLevel.INTERMEDIATE, consumables: [{ inventoryItem: faceMask._id, quantityRequired: 1 }] });

        console.log('💇‍♀️ Services created');

        console.log('✨ Database Seeding Completed Successfully');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
};

seedDatabase();
