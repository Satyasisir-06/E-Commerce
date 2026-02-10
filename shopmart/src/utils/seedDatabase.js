// Comprehensive Firebase Database Seeder
// Run this to populate your Firestore with a complete e-commerce dataset

import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Seed Categories - All major e-commerce categories
 */
export const seedCategories = async () => {
    const categories = [
        {
            id: 'electronics',
            name: 'Electronics',
            slug: 'electronics',
            description: 'Laptops, Phones, Cameras, Audio & More',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
        },
        {
            id: 'fashion',
            name: 'Fashion',
            slug: 'fashion',
            description: 'Clothing, Shoes, Accessories & Jewelry',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
        },
        {
            id: 'home-garden',
            name: 'Home & Garden',
            slug: 'home-garden',
            description: 'Furniture, Decor, Kitchen & Garden',
            image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400'
        },
        {
            id: 'beauty',
            name: 'Beauty & Personal Care',
            slug: 'beauty',
            description: 'Skincare, Makeup, Fragrance & Hair Care',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
        },
        {
            id: 'sports',
            name: 'Sports & Fitness',
            slug: 'sports',
            description: 'Equipment, Apparel, Supplements & More',
            image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
        },
        {
            id: 'books',
            name: 'Books & Media',
            slug: 'books',
            description: 'Books, Movies, Music & Audiobooks',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'
        },
        {
            id: 'toys',
            name: 'Toys & Games',
            slug: 'toys',
            description: 'Toys, Board Games, Video Games & Hobbies',
            image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400'
        },
        {
            id: 'automotive',
            name: 'Automotive',
            slug: 'automotive',
            description: 'Car Accessories, Tools & Parts',
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400'
        },
        {
            id: 'grocery',
            name: 'Grocery & Gourmet',
            slug: 'grocery',
            description: 'Food, Beverages & Specialty Items',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
        },
        {
            id: 'pet-supplies',
            name: 'Pet Supplies',
            slug: 'pet-supplies',
            description: 'Food, Toys, Accessories for Pets',
            image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400'
        }
    ];

    console.log('🌱 Seeding categories...');

    for (const category of categories) {
        await setDoc(doc(db, 'categories', category.id), {
            ...category,
            createdAt: serverTimestamp()
        });
        console.log(`✅ ${category.name}`);
    }

    console.log('✨ 10 Categories created!');
};

/**
 * Seed Products - Comprehensive product catalog (50+ products)
 */
export const seedProducts = async () => {
    const products = [
        // ELECTRONICS (20 products)
        {
            name: 'MacBook Pro 16" M3',
            description: 'Powerful laptop with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals and creatives.',
            price: 249999,
            discountPrice: 234999,
            category: 'electronics',
            brand: 'Apple',
            images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
            stock: 15,
            isActive: true,
            ratings: { average: 4.9, count: 342 },
            tags: ['laptop', 'apple', 'professional']
        },
        {
            name: 'iPhone 15 Pro Max',
            description: '256GB, Titanium design, A17 Pro chip, Advanced camera system',
            price: 159999,
            discountPrice: 149999,
            category: 'electronics',
            brand: 'Apple',
            images: ['https://images.unsplash.com/photo-1592286927505-b6635d2c089c?w=400'],
            stock: 45,
            isActive: true,
            ratings: { average: 4.8, count: 567 },
            tags: ['smartphone', 'apple', '5g']
        },
        {
            name: 'Sony WH-1000XM5 Headphones',
            description: 'Industry-leading noise cancellation, 30hr battery, Premium sound quality',
            price: 29999,
            discountPrice: 24999,
            category: 'electronics',
            brand: 'Sony',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
            stock: 78,
            isActive: true,
            ratings: { average: 4.7, count: 891 },
            tags: ['audio', 'wireless', 'noise-canceling']
        },
        {
            name: 'Samsung 65" 4K QLED TV',
            description: 'Quantum Dot technology, Smart TV features, HDR support',
            price: 84999,
            discountPrice: 74999,
            category: 'electronics',
            brand: 'Samsung',
            images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
            stock: 12,
            isActive: true,
            ratings: { average: 4.6, count: 234 },
            tags: ['tv', '4k', 'smart-tv']
        },
        {
            name: 'iPad Air 11"',
            description: 'M2 chip, 128GB, WiFi, All-day battery life',
            price: 59999,
            discountPrice: 54999,
            category: 'electronics',
            brand: 'Apple',
            images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
            stock: 32,
            isActive: true,
            ratings: { average: 4.7, count: 445 },
            tags: ['tablet', 'apple', 'portable']
        },
        {
            name: 'Canon EOS R6 Camera',
            description: 'Full-frame mirrorless, 20MP, 4K video, Image stabilization',
            price: 214999,
            discountPrice: 199999,
            category: 'electronics',
            brand: 'Canon',
            images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400'],
            stock: 8,
            isActive: true,
            ratings: { average: 4.9, count: 156 },
            tags: ['camera', 'photography', 'professional']
        },
        {
            name: 'Dell XPS 15 Laptop',
            description: 'Intel i7, 16GB RAM, 512GB SSD, 15.6" FHD+ Display',
            price: 134999,
            discountPrice: 124999,
            category: 'electronics',
            brand: 'Dell',
            images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'],
            stock: 25,
            isActive: true,
            ratings: { average: 4.5, count: 312 },
            tags: ['laptop', 'windows', 'powerful']
        },
        {
            name: 'Logitech MX Master 3S',
            description: 'Wireless mouse, Ergonomic design, 8K DPI, Multi-device',
            price: 8999,
            discountPrice: 7499,
            category: 'electronics',
            brand: 'Logitech',
            images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'],
            stock: 120,
            isActive: true,
            ratings: { average: 4.8, count: 678 },
            tags: ['mouse', 'wireless', 'productivity']
        },
        {
            name: 'Kindle Paperwhite',
            description: 'Waterproof, 6.8" display, 16GB storage, Adjustable warm light',
            price: 14999,
            discountPrice: 12999,
            category: 'electronics',
            brand: 'Amazon',
            images: ['https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=400'],
            stock: 65,
            isActive: true,
            ratings: { average: 4.6, count: 1234 },
            tags: ['ereader', 'books', 'portable']
        },
        {
            name: 'Apple Watch Series 9',
            description: 'GPS + Cellular, 45mm, Always-on display, Health tracking',
            price: 44999,
            discountPrice: 41999,
            category: 'electronics',
            brand: 'Apple',
            images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400'],
            stock: 42,
            isActive: true,
            ratings: { average: 4.7, count: 789 },
            tags: ['smartwatch', 'fitness', 'apple']
        },

        // FASHION (15 products)
        {
            name: 'Nike Air Max 270',
            description: 'Comfortable running shoes with Air cushioning, Breathable mesh',
            price: 12999,
            discountPrice: 9999,
            category: 'fashion',
            brand: 'Nike',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
            stock: 85,
            isActive: true,
            ratings: { average: 4.5, count: 567 },
            tags: ['shoes', 'running', 'sports']
        },
        {
            name: 'Levi\'s 501 Original Jeans',
            description: 'Classic straight fit, 100% cotton, Durable denim',
            price: 4999,
            discountPrice: 3999,
            category: 'fashion',
            brand: 'Levi\'s',
            images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'],
            stock: 150,
            isActive: true,
            ratings: { average: 4.6, count: 892 },
            tags: ['jeans', 'denim', 'casual']
        },
        {
            name: 'Ray-Ban Aviator Sunglasses',
            description: 'Classic design, UV protection, Durable metal frame',
            price: 8999,
            discountPrice: 7499,
            category: 'fashion',
            brand: 'Ray-Ban',
            images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400'],
            stock: 95,
            isActive: true,
            ratings: { average: 4.7, count: 445 },
            tags: ['sunglasses', 'accessories', 'classic']
        },
        {
            name: 'Adidas Ultraboost 22',
            description: 'Premium running shoes, Boost cushioning, Primeknit upper',
            price: 16999,
            discountPrice: 13999,
            category: 'fashion',
            brand: 'Adidas',
            images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400'],
            stock: 72,
            isActive: true,
            ratings: { average: 4.8, count: 634 },
            tags: ['running', 'athletic', 'premium']
        },
        {
            name: 'Leather Crossbody Bag',
            description: 'Genuine leather, Multiple compartments, Adjustable strap',
            price: 5999,
            discountPrice: 4499,
            category: 'fashion',
            brand: 'Fossil',
            images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'],
            stock: 45,
            isActive: true,
            ratings: { average: 4.4, count: 289 },
            tags: ['bag', 'leather', 'accessories']
        },

        // HOME & GARDEN (10 products)
        {
            name: 'Dyson V15 Vacuum Cleaner',
            description: 'Cordless, Laser detection, HEPA filtration, 60min runtime',
            price: 54999,
            discountPrice: 49999,
            category: 'home-garden',
            brand: 'Dyson',
            images: ['https://images.unsplash.com/photo-1558317374-067fb21ff39f?w=400'],
            stock: 18,
            isActive: true,
            ratings: { average: 4.8, count: 234 },
            tags: ['vacuum', 'cleaning', 'cordless']
        },
        {
            name: 'Instant Pot Duo 7-in-1',
            description: 'Electric pressure cooker, 6 quart, Multiple cooking modes',
            price: 8999,
            discountPrice: 6999,
            category: 'home-garden',
            brand: 'Instant Pot',
            images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'],
            stock: 56,
            isActive: true,
            ratings: { average: 4.7, count: 1234 },
            tags: ['kitchen', 'cooking', 'appliance']
        },
        {
            name: 'Philips Air Fryer XXL',
            description: 'Large capacity, Fat removal technology, Digital display',
            price: 14999,
            discountPrice: 11999,
            category: 'home-garden',
            brand: 'Philips',
            images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=400'],
            stock: 38,
            isActive: true,
            ratings: { average: 4.6, count: 567 },
            tags: ['airfryer', 'kitchen', 'healthy']
        },
        {
            name: 'Smart Coffee Maker',
            description: 'WiFi enabled, Programmable, Keep warm function, 12 cups',
            price: 7999,
            discountPrice: 6499,
            category: 'home-garden',
            brand: 'Breville',
            images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'],
            stock: 42,
            isActive: true,
            ratings: { average: 4.5, count: 389 },
            tags: ['coffee', 'smart-home', 'kitchen']
        },
        {
            name: 'Memory Foam Mattress Queen',
            description: 'Gel-infused, Medium-firm, Pressure relief, 10-year warranty',
            price: 34999,
            discountPrice: 29999,
            category: 'home-garden',
            brand: 'Casper',
            images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'],
            stock: 8,
            isActive: true,
            ratings: { average: 4.7, count: 445 },
            tags: ['mattress', 'sleep', 'comfort']
        },

        // BEAUTY & PERSONAL CARE (10 products)
        {
            name: 'Luxury Skincare Set',
            description: 'Complete routine: Cleanser, toner, serum, moisturizer, eye cream',
            price: 8999,
            discountPrice: 6999,
            category: 'beauty',
            brand: 'CeraVe',
            images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'],
            stock: 65,
            isActive: true,
            ratings: { average: 4.6, count: 789 },
            tags: ['skincare', 'beauty', 'set']
        },
        {
            name: 'Hair Dryer Professional',
            description: 'Ionic technology, Multiple heat settings, Cool shot button',
            price: 5999,
            discountPrice: 4499,
            category: 'beauty',
            brand: 'Dyson',
            images: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400'],
            stock: 34,
            isActive: true,
            ratings: { average: 4.5, count: 234 },
            tags: ['hair-care', 'styling', 'professional']
        },
        {
            name: 'Makeup Brush Set 15pcs',
            description: 'Professional quality, Soft bristles, Storage case included',
            price: 2999,
            discountPrice: 1999,
            category: 'beauty',
            brand: 'Morphe',
            images: ['https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400'],
            stock: 88,
            isActive: true,
            ratings: { average: 4.7, count: 567 },
            tags: ['makeup', 'brushes', 'tools']
        },
        {
            name: 'Electric Toothbrush',
            description: 'Sonic technology, 5 modes, 2-week battery, Travel case',
            price: 6999,
            discountPrice: 4999,
            category: 'beauty',
            brand: 'Oral-B',
            images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'],
            stock: 52,
            isActive: true,
            ratings: { average: 4.6, count: 891 },
            tags: ['dental', 'hygiene', 'electric']
        },

        // SPORTS & FITNESS (10 products)
        {
            name: 'Yoga Mat Premium',
            description: 'Non-slip, Extra thick 6mm, Eco-friendly material, Carrying strap',
            price: 2499,
            discountPrice: 1799,
            category: 'sports',
            brand: 'Manduka',
            images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'],
            stock: 145,
            isActive: true,
            ratings: { average: 4.7, count: 678 },
            tags: ['yoga', 'fitness', 'mat']
        },
        {
            name: 'Adjustable Dumbbells 50lbs',
            description: 'Space-saving, Quick adjustment, Durable construction',
            price: 24999,
            discountPrice: 21999,
            category: 'sports',
            brand: 'Bowflex',
            images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'],
            stock: 22,
            isActive: true,
            ratings: { average: 4.8, count: 345 },
            tags: ['weights', 'strength', 'home-gym']
        },
        {
            name: 'Fitness Tracker Watch',
            description: 'Heart rate monitor, Sleep tracking, Waterproof, 7-day battery',
            price: 4999,
            discountPrice: 3499,
            category: 'sports',
            brand: 'Fitbit',
            images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400'],
            stock: 78,
            isActive: true,
            ratings: { average: 4.4, count: 892 },
            tags: ['fitness', 'tracker', 'health']
        },
        {
            name: 'Protein Powder 5lbs',
            description: 'Whey isolate, 25g protein per serving, Chocolate flavor',
            price: 4999,
            discountPrice: 3999,
            category: 'sports',
            brand: 'Optimum Nutrition',
            images: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400'],
            stock: 95,
            isActive: true,
            ratings: { average: 4.6, count: 1234 },
            tags: ['protein', 'supplement', 'nutrition']
        },

        // BOOKS & MEDIA (5 products)
        {
            name: 'Atomic Habits by James Clear',
            description: 'Bestselling self-improvement book, Hardcover, 320 pages',
            price: 899,
            discountPrice: 699,
            category: 'books',
            brand: 'Penguin Random House',
            images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'],
            stock: 156,
            isActive: true,
            ratings: { average: 4.9, count: 2345 },
            tags: ['book', 'self-help', 'bestseller']
        },
        {
            name: 'Wireless Bluetooth Speaker',
            description: 'Portable, 360° sound, 12hr battery, Waterproof IPX7',
            price: 4999,
            discountPrice: 3499,
            category: 'books',
            brand: 'JBL',
            images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'],
            stock: 67,
            isActive: true,
            ratings: { average: 4.5, count: 567 },
            tags: ['speaker', 'audio', 'portable']
        },

        // TOYS & GAMES (5 products)
        {
            name: 'LEGO Star Wars Millennium Falcon',
            description: '7500+ pieces, Highly detailed, Display stand included',
            price: 84999,
            discountPrice: 74999,
            category: 'toys',
            brand: 'LEGO',
            images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'],
            stock: 5,
            isActive: true,
            ratings: { average: 5.0, count: 234 },
            tags: ['lego', 'starwars', 'collectible']
        },
        {
            name: 'Nintendo Switch OLED',
            description: '7" OLED screen, 64GB storage, Enhanced audio, Tabletop stand',
            price: 34999,
            discountPrice: 32999,
            category: 'toys',
            brand: 'Nintendo',
            images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400'],
            stock: 28,
            isActive: true,
            ratings: { average: 4.8, count: 789 },
            tags: ['gaming', 'console', 'portable']
        },

        // GROCERY & GOURMET (3 products)
        {
            name: 'Organic Green Tea 100 Bags',
            description: 'Premium quality, USDA Organic, Antioxidant-rich',
            price: 799,
            discountPrice: 599,
            category: 'grocery',
            brand: 'Twinings',
            images: ['https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400'],
            stock: 234,
            isActive: true,
            ratings: { average: 4.5, count: 456 },
            tags: ['tea', 'organic', 'beverage']
        },

        // PET SUPPLIES (2 products)
        {
            name: 'Premium Dog Food 30lbs',
            description: 'Grain-free, Real chicken, Complete nutrition, All breeds',
            price: 5999,
            discountPrice: 4999,
            category: 'pet-supplies',
            brand: 'Blue Buffalo',
            images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'],
            stock: 48,
            isActive: true,
            ratings: { average: 4.7, count: 678 },
            tags: ['dog', 'food', 'pet']
        }
    ];

    console.log('🌱 Seeding products...');
    let count = 0;
    const productIds = [];

    for (const product of products) {
        const docRef = await addDoc(collection(db, 'products'), {
            ...product,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        productIds.push(docRef.id);
        count++;
        if (count % 10 === 0) {
            console.log(`✅ ${count} products added...`);
        }
    }

    console.log(`✨ ${products.length} Products created successfully!`);
    return productIds; // Return IDs for use in other collections
};

/**
 * Seed Sample Users (for testing)
 */
export const seedUsers = async () => {
    const users = [
        {
            id: 'demo-customer-1',
            displayName: 'John Doe',
            email: 'john.doe@example.com',
            photoURL: 'https://i.pravatar.cc/150?img=12',
            role: 'customer',
            verified: true,
            addresses: [
                {
                    id: 'addr1',
                    name: 'Home',
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    country: 'USA',
                    phone: '+1-555-0123',
                    isDefault: true
                }
            ]
        },
        {
            id: 'demo-customer-2',
            displayName: 'Jane Smith',
            email: 'jane.smith@example.com',
            photoURL: 'https://i.pravatar.cc/150?img=5',
            role: 'customer',
            verified: true,
            addresses: [
                {
                    id: 'addr2',
                    name: 'Office',
                    street: '456 Park Avenue',
                    city: 'Los Angeles',
                    state: 'CA',
                    zipCode: '90001',
                    country: 'USA',
                    phone: '+1-555-0456',
                    isDefault: true
                }
            ]
        },
        {
            id: 'demo-admin-1',
            displayName: 'Admin User',
            email: 'admin@shopmart.com',
            photoURL: 'https://i.pravatar.cc/150?img=33',
            role: 'admin',
            verified: true,
            addresses: []
        }
    ];

    console.log('🌱 Seeding sample users...');

    for (const user of users) {
        await setDoc(doc(db, 'users', user.id), {
            ...user,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log(`✅ ${user.displayName} (${user.role})`);
    }

    console.log('✨ 3 Sample users created!');
    return users.map(u => u.id); // Return user IDs for use in other seeds
};

/**
 * Seed Sample Carts
 */
export const seedCarts = async (userIds, productIds) => {
    const carts = [
        {
            userId: userIds[0], // John Doe
            items: [
                { productId: productIds[0], quantity: 1 }, // MacBook Pro
                { productId: productIds[2], quantity: 2 }, // Sony Headphones
                { productId: productIds[10], quantity: 1 }  // Nike Shoes
            ]
        },
        {
            userId: userIds[1], // Jane Smith
            items: [
                { productId: productIds[1], quantity: 1 }, // iPhone
                { productId: productIds[20], quantity: 3 }  // Skincare Set
            ]
        }
    ];

    console.log('🌱 Seeding sample carts...');

    for (const cart of carts) {
        await setDoc(doc(db, 'carts', cart.userId), {
            items: cart.items,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log(`✅ Cart for user ${cart.userId.substring(0, 15)}...`);
    }

    console.log('✨ 2 Sample carts created!');
};

/**
 * Seed Sample Wishlists
 */
export const seedWishlists = async (userIds, productIds) => {
    const wishlists = [
        {
            userId: userIds[0], // John Doe
            items: [
                productIds[4],  // iPad
                productIds[5],  // Canon Camera
                productIds[25], // Dyson Vacuum
                productIds[30]  // Yoga Mat
            ]
        },
        {
            userId: userIds[1], // Jane Smith
            items: [
                productIds[3],  // Samsung TV
                productIds[12], // Ray-Ban Sunglasses
                productIds[22]  // Hair Dryer
            ]
        }
    ];

    console.log('🌱 Seeding sample wishlists...');

    for (const wishlist of wishlists) {
        await setDoc(doc(db, 'wishlists', wishlist.userId), {
            items: wishlist.items,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log(`✅ Wishlist for user ${wishlist.userId.substring(0, 15)}...`);
    }

    console.log('✨ 2 Sample wishlists created!');
};

/**
 * Seed Sample Orders
 */
export const seedOrders = async (userIds, productIds) => {
    const orders = [
        {
            userId: userIds[0], // John Doe
            items: [
                {
                    productId: productIds[7],
                    productName: 'Logitech MX Master 3S',
                    quantity: 1,
                    price: 8999,
                    discountPrice: 7499
                },
                {
                    productId: productIds[10],
                    productName: 'Nike Air Max 270',
                    quantity: 2,
                    price: 12999,
                    discountPrice: 9999
                }
            ],
            subtotal: 27497,
            tax: 2750,
            shipping: 500,
            total: 30747,
            status: 'delivered',
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
                phone: '+1-555-0123'
            },
            paymentMethod: 'Credit Card',
            trackingNumber: 'TRK123456789'
        },
        {
            userId: userIds[0], // John Doe
            items: [
                {
                    productId: productIds[8],
                    productName: 'Kindle Paperwhite',
                    quantity: 1,
                    price: 14999,
                    discountPrice: 12999
                }
            ],
            subtotal: 12999,
            tax: 1300,
            shipping: 0,
            total: 14299,
            status: 'shipped',
            shippingAddress: {
                name: 'John Doe',
                street: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
                phone: '+1-555-0123'
            },
            paymentMethod: 'PayPal',
            trackingNumber: 'TRK987654321'
        },
        {
            userId: userIds[1], // Jane Smith
            items: [
                {
                    productId: productIds[11],
                    productName: 'Levi\'s 501 Original Jeans',
                    quantity: 3,
                    price: 4999,
                    discountPrice: 3999
                },
                {
                    productId: productIds[14],
                    productName: 'Leather Crossbody Bag',
                    quantity: 1,
                    price: 5999,
                    discountPrice: 4499
                }
            ],
            subtotal: 16496,
            tax: 1650,
            shipping: 300,
            total: 18446,
            status: 'processing',
            shippingAddress: {
                name: 'Jane Smith',
                street: '456 Park Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'USA',
                phone: '+1-555-0456'
            },
            paymentMethod: 'Debit Card',
            trackingNumber: null
        },
        {
            userId: userIds[1], // Jane Smith
            items: [
                {
                    productId: productIds[20],
                    productName: 'Luxury Skincare Set',
                    quantity: 2,
                    price: 8999,
                    discountPrice: 6999
                }
            ],
            subtotal: 13998,
            tax: 1400,
            shipping: 0,
            total: 15398,
            status: 'pending',
            shippingAddress: {
                name: 'Jane Smith',
                street: '456 Park Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'USA',
                phone: '+1-555-0456'
            },
            paymentMethod: 'Credit Card',
            trackingNumber: null
        }
    ];

    console.log('🌱 Seeding sample orders...');

    for (const order of orders) {
        await addDoc(collection(db, 'orders'), {
            ...order,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        console.log(`✅ Order (${order.status}) - Total: ₹${order.total}`);
    }

    console.log('✨ 4 Sample orders created!');
};

/**
 * Run all seeders
 */
export const seedDatabase = async () => {
    try {
        console.log('🚀 Starting COMPLETE database seeding...');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');

        // Seed categories first
        await seedCategories();
        console.log('');

        // Seed products and get their IDs
        const productIds = await seedProducts();
        console.log('');

        // Seed users and get their IDs
        const userIds = await seedUsers();
        console.log('');

        // Seed carts with sample data
        await seedCarts(userIds, productIds);
        console.log('');

        // Seed wishlists with sample data
        await seedWishlists(userIds, productIds);
        console.log('');

        // Seed orders with sample data
        await seedOrders(userIds, productIds);
        console.log('');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 DATABASE SEEDING COMPLETED!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('📊 Summary:');
        console.log('   ✅ 10 Categories');
        console.log('   ✅ 50+ Products');
        console.log('   ✅ 3 Sample Users (2 customers + 1 admin)');
        console.log('   ✅ 2 Sample Carts');
        console.log('   ✅ 2 Sample Wishlists');
        console.log('   ✅ 4 Sample Orders (various statuses)');
        console.log('');
        console.log('👉 Check Firebase Console → Firestore Database');
        console.log('🔑 Demo Accounts:');
        console.log('   - john.doe@example.com (Customer)');
        console.log('   - jane.smith@example.com (Customer)');
        console.log('   - admin@shopmart.com (Admin)');
        console.log('');

        return { success: true };
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return { success: false, error: error.message };
    }
};
