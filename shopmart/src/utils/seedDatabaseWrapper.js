// Simple database seeder using the existing huge seedDatabase.js
// This creates a wrapper function that returns a success/error object

import { seedCategories, seedProducts } from './seedDatabase';

export async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Seed categories first
        await seedCategories();

        // Then seed products
        await seedProducts();

        console.log('✅ Database seeding completed!');

        return {
            success: true,
            message: 'Database seeded successfully!'
        };
    } catch (error) {
        console.error('❌ Seeding error:', error);
        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    }
}
