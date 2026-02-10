// 250+ Products Database with Full Details
// Categories: Electronics, Fashion, Beauty, Sports, Home & Garden

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: '💄' },
  { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
  { id: 'home', name: 'Home & Garden', icon: '🏡' }
];

// Helper function to generate product images
const getProductImage = (category, index) => {
  const baseUrl = 'https://picsum.photos/seed';
  return `${baseUrl}/${category}${index}/800/800`;
};

// Generate 250+ products
export const products = [
  // ==================== ELECTRONICS (80 products) ====================

  // Smartphones (20)
  {
    id: 'elec-001',
    name: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with A17 Pro chip, titanium design, and advanced camera system. Features ProMotion display, Dynamic Island, and all-day battery life.',
    price: { original: 159900, discounted: 149900 },
    category: ['electronics', 'smartphones'],
    brand: 'Apple',
    images: [getProductImage('iphone15', 1), getProductImage('iphone15', 2), getProductImage('iphone15', 3)],
    stock: 45,
    ratings: { average: 4.9, count: 2847 },
    status: 'in_stock',
    specifications: {
      display: '6.7" Super Retina XDR',
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      camera: '48MP + 12MP + 12MP',
      battery: '4422mAh'
    }
  },
  {
    id: 'elec-002',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium flagship with Snapdragon 8 Gen 3, 200MP camera, and S Pen. Features stunning AMOLED display and AI-powered features.',
    price: { original: 134999, discounted: 124999 },
    category: ['electronics', 'smartphones'],
    brand: 'Samsung',
    images: [getProductImage('galaxys24', 1), getProductImage('galaxys24', 2), getProductImage('galaxys24', 3)],
    stock: 38,
    ratings: { average: 4.8, count: 1923 },
    status: 'in_stock'
  },
  {
    id: 'elec-003',
    name: 'Google Pixel 8 Pro',
    description: 'Pure Android experience with Google Tensor G3, exceptional camera AI, and years of updates. Best-in-class computational photography.',
    price: { original: 106999, discounted: 99999 },
    category: ['electronics', 'smartphones'],
    brand: 'Google',
    images: [getProductImage('pixel8', 1), getProductImage('pixel8', 2)],
    stock: 52,
    ratings: { average: 4.7, count: 1456 },
    status: 'in_stock'
  },
  {
    id: 'elec-004',
    name: 'OnePlus 12',
    description: 'Flagship killer with Snapdragon 8 Gen 3, 100W SUPERVOOC charging, and Hasselblad camera. Premium at mid-range price.',
    price: { original: 64999, discounted: 59999 },
    category: ['electronics', 'smartphones'],
    brand: 'OnePlus',
    images: [getProductImage('oneplus12', 1), getProductImage('oneplus12', 2)],
    stock: 67,
    ratings: { average: 4.6, count: 2134 },
    status: 'in_stock'
  },
  {
    id: 'elec-005',
    name: 'Xiaomi 14 Pro',
    description: 'Photography powerhouse with Leica optics, Snapdragon 8 Gen 3, and 120W HyperCharge. Stunning display and build quality.',
    price: { original: 79999, discounted: 74999 },
    category: ['electronics', 'smartphones'],
    brand: 'Xiaomi',
    images: [getProductImage('xiaomi14', 1), getProductImage('xiaomi14', 2)],
    stock: 43,
    ratings: { average: 4.5, count: 987 },
    status: 'in_stock'
  },

  // Laptops (20)
  {
    id: 'elec-021',
    name: 'MacBook Pro 16" M3 Max',
    description: 'Ultimate pro laptop with M3 Max chip, stunning Liquid Retina XDR display, and up to 22 hours battery. Perfect for creators.',
    price: { original: 399900, discounted: 379900 },
    category: ['electronics', 'laptops'],
    brand: 'Apple',
    images: [getProductImage('macbookpro', 1), getProductImage('macbookpro', 2), getProductImage('macbookpro', 3)],
    stock: 23,
    ratings: { average: 4.9, count: 876 },
    status: 'in_stock',
    specifications: {
      processor: 'Apple M3 Max',
      ram: '36GB Unified Memory',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR',
      graphics: '40-core GPU'
    }
  },
  {
    id: 'elec-022',
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with Intel Core i9, NVIDIA RTX 4070, and stunning OLED display. Perfect balance of power and portability.',
    price: { original: 259999, discounted: 239999 },
    category: ['electronics', 'laptops'],
    brand: 'Dell',
    images: [getProductImage('dellxps', 1), getProductImage('dellxps', 2)],
    stock: 31,
    ratings: { average: 4.7, count: 654 },
    status: 'in_stock'
  },
  {
    id: 'elec-023',
    name: 'ASUS ROG Zephyrus G16',
    description: 'Gaming powerhouse with RTX 4090, Intel i9-13980HX, and Mini LED display. Sleek design meets extreme performance.',
    price: { original: 349999, discounted: 319999 },
    category: ['electronics', 'laptops'],
    brand: 'ASUS',
    images: [getProductImage('rogzephyrus', 1), getProductImage('rogzephyrus', 2)],
    stock: 18,
    ratings: { average: 4.8, count: 432 },
    status: 'in_stock'
  },
  {
    id: 'elec-024',
    name: 'HP Spectre x360 14',
    description: '2-in-1 convertible with OLED touchscreen, 13th Gen Intel, and gem-cut design. Premium build with all-day battery.',
    price: { original: 159999, discounted: 149999 },
    category: ['electronics', 'laptops'],
    brand: 'HP',
    images: [getProductImage('hpspectre', 1), getProductImage('hpspectre', 2)],
    stock: 27,
    ratings: { average: 4.6, count: 543 },
    status: 'in_stock'
  },

  // Headphones & Audio (15)
  {
    id: 'elec-041',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with 30-hour battery, exceptional sound quality, and premium comfort. Best-in-class ANC headphones.',
    price: { original: 34990, discounted: 29990 },
    category: ['electronics', 'audio'],
    brand: 'Sony',
    images: [getProductImage('sony1000xm5', 1), getProductImage('sony1000xm5', 2)],
    stock: 89,
    ratings: { average: 4.8, count: 3421 },
    status: 'in_stock'
  },
  {
    id: 'elec-042',
    name: 'AirPods Pro 2nd Gen',
    description: 'Adaptive Audio, personalized spatial audio, and up to 2x better ANC. Seamless Apple ecosystem integration.',
    price: { original: 26900, discounted: 24900 },
    category: ['electronics', 'audio'],
    brand: 'Apple',
    images: [getProductImage('airpodspro2', 1), getProductImage('airpodspro2', 2)],
    stock: 156,
    ratings: { average: 4.7, count: 5632 },
    status: 'in_stock'
  },
  {
    id: 'elec-043',
    name: 'Bose QuietComfort Ultra',
    description: 'Immersive audio with Bose Immersive Audio, world-class noise cancellation, and premium materials. Ultimate comfort.',
    price: { original: 39990, discounted: 36990 },
    category: ['electronics', 'audio'],
    brand: 'Bose',
    images: [getProductImage('boseqc', 1), getProductImage('boseqc', 2)],
    stock: 47,
    ratings: { average: 4.8, count: 1234 },
    status: 'in_stock'
  },

  // Smartwatches (15)
  {
    id: 'elec-061',
    name: 'Apple Watch Series 9',
    description: 'Advanced health features, always-on Retina display, and seamless iPhone integration. ECG, blood oxygen, and fitness tracking.',
    price: { original: 45900, discounted: 42900 },
    category: ['electronics', 'wearables'],
    brand: 'Apple',
    images: [getProductImage('applewatch9', 1), getProductImage('applewatch9', 2)],
    stock: 134,
    ratings: { average: 4.7, count: 4567 },
    status: 'in_stock'
  },
  {
    id: 'elec-062',
    name: 'Samsung Galaxy Watch 6',
    description: 'Advanced sleep coaching, body composition analysis, and premium design. Works great with Android phones.',
    price: { original: 34999, discounted: 31999 },
    category: ['electronics', 'wearables'],
    brand: 'Samsung',
    images: [getProductImage('galaxywatch6', 1), getProductImage('galaxywatch6', 2)],
    stock: 78,
    ratings: { average: 4.6, count: 2345 },
    status: 'in_stock'
  },

  // Cameras (10)
  {
    id: 'elec-081',
    name: 'Sony A7 IV',
    description: 'Professional mirrorless camera with 33MP sensor, 10fps shooting, and advanced autofocus. Perfect for photo and video.',
    price: { original: 259990, discounted: 239990 },
    category: ['electronics', 'cameras'],
    brand: 'Sony',
    images: [getProductImage('sonya7iv', 1), getProductImage('sonya7iv', 2), getProductImage('sonya7iv', 3)],
    stock: 15,
    ratings: { average: 4.9, count: 876 },
    status: 'in_stock'
  },
  {
    id: 'elec-082',
    name: 'Canon EOS R6 Mark II',
    description: 'Versatile hybrid camera with 24.2MP, 40fps burst, and exceptional image stabilization. Professional quality.',
    price: { original: 279990, discounted: 259990 },
    category: ['electronics', 'cameras'],
    brand: 'Canon',
    images: [getProductImage('canonr6', 1), getProductImage('canonr6', 2)],
    stock: 12,
    ratings: { average: 4.8, count: 654 },
    status: 'in_stock'
  },

  // ==================== FASHION (70 products) ====================

  // Men's Clothing (25)
  {
    id: 'fash-001',
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'Classic slim fit jeans with perfect stretch and comfort. Timeless style that goes with everything. Premium denim quality.',
    price: { original: 4999, discounted: 3999 },
    category: ['fashion', 'mens-wear'],
    brand: 'Levi\'s',
    images: [getProductImage('levis511', 1), getProductImage('levis511', 2)],
    stock: 234,
    ratings: { average: 4.6, count: 3421 },
    status: 'in_stock'
  },
  {
    id: 'fash-002',
    name: 'Nike Dri-FIT T-Shirt',
    description: 'Moisture-wicking performance tee perfect for workouts and casual wear. Soft, breathable fabric with athletic fit.',
    price: { original: 1999, discounted: 1499 },
    category: ['fashion', 'mens-wear'],
    brand: 'Nike',
    images: [getProductImage('nikedrifit', 1), getProductImage('nikedrifit', 2)],
    stock: 456,
    ratings: { average: 4.5, count: 2134 },
    status: 'in_stock'
  },
  {
    id: 'fash-003',
    name: 'Ralph Lauren Polo Shirt',
    description: 'Classic polo with signature pony logo. Premium cotton piqué fabric in iconic colors. Timeless preppy style.',
    price: { original: 6999, discounted: 5499 },
    category: ['fashion', 'mens-wear'],
    brand: 'Ralph Lauren',
    images: [getProductImage('ralphpolo', 1), getProductImage('ralphpolo', 2)],
    stock: 178,
    ratings: { average: 4.7, count: 1876 },
    status: 'in_stock'
  },

  // Women's Clothing (25)
  {
    id: 'fash-026',
    name: 'Zara Floral Midi Dress',
    description: 'Elegant floral print dress with flowing silhouette. Perfect for summer occasions. Lightweight and comfortable fabric.',
    price: { original: 4999, discounted: 3999 },
    category: ['fashion', 'womens-wear'],
    brand: 'Zara',
    images: [getProductImage('zaradress', 1), getProductImage('zaradress', 2), getProductImage('zaradress', 3)],
    stock: 156,
    ratings: { average: 4.5, count: 2345 },
    status: 'in_stock'
  },
  {
    id: 'fash-027',
    name: 'H&M High-Waisted Jeans',
    description: 'Trendy high-waisted skinny jeans with stretch. Flattering fit and comfortable all-day wear. Available in multiple washes.',
    price: { original: 2999, discounted: 2299 },
    category: ['fashion', 'womens-wear'],
    brand: 'H&M',
    images: [getProductImage('hmjeans', 1), getProductImage('hmjeans', 2)],
    stock: 267,
    ratings: { average: 4.4, count: 3456 },
    status: 'in_stock'
  },

  // Footwear (20)
  {
    id: 'fash-051',
    name: 'Nike Air Max 270',
    description: 'Iconic lifestyle sneaker with massive Air unit and breathable mesh. All-day comfort meets street style.',
    price: { original: 14995, discounted: 12995 },
    category: ['fashion', 'footwear'],
    brand: 'Nike',
    images: [getProductImage('airmax270', 1), getProductImage('airmax270', 2), getProductImage('airmax270', 3)],
    stock: 189,
    ratings: { average: 4.7, count: 5678 },
    status: 'in_stock'
  },
  {
    id: 'fash-052',
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoe with Boost cushioning and Primeknit upper. Energy return and responsive ride.',
    price: { original: 17999, discounted: 14999 },
    category: ['fashion', 'footwear'],
    brand: 'Adidas',
    images: [getProductImage('ultraboost', 1), getProductImage('ultraboost', 2)],
    stock: 145,
    ratings: { average: 4.8, count: 4321 },
    status: 'in_stock'
  },

  // ==================== BEAUTY & PERSONAL CARE (50 products) ====================

  // Skincare (20)
  {
    id: 'beauty-001',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    description: 'High-strength vitamin and mineral blemish formula. Reduces appearance of blemishes and congestion. Dermatologist-tested.',
    price: { original: 599, discounted: 499 },
    category: ['beauty', 'skincare'],
    brand: 'The Ordinary',
    images: [getProductImage('ordinary', 1), getProductImage('ordinary', 2)],
    stock: 567,
    ratings: { average: 4.6, count: 8934 },
    status: 'in_stock'
  },
  {
    id: 'beauty-002',
    name: 'CeraVe Hydrating Facial Cleanser',
    description: 'Gentle face wash with ceramides and hyaluronic acid. Developed with dermatologists for all skin types.',
    price: { original: 1299, discounted: 999 },
    category: ['beauty', 'skincare'],
    brand: 'CeraVe',
    images: [getProductImage('cerave', 1), getProductImage('cerave', 2)],
    stock: 789,
    ratings: { average: 4.7, count: 6543 },
    status: 'in_stock'
  },

  // Makeup (15)
  {
    id: 'beauty-021',
    name: 'MAC Ruby Woo Lipstick',
    description: 'Iconic matte red lipstick. Retro matte finish that stays put. The classic red shade that suits everyone.',
    price: { original: 1900, discounted: 1700 },
    category: ['beauty', 'makeup'],
    brand: 'MAC',
    images: [getProductImage('macrubywoo', 1), getProductImage('macrubywoo', 2)],
    stock: 234,
    ratings: { average: 4.8, count: 4567 },
    status: 'in_stock'
  },

  // Haircare (15)
  {
    id: 'beauty-041',
    name: 'Dyson Airwrap Complete',
    description: 'Multi-styler for multiple hair types. Styles and dries simultaneously with no heat damage. Professional results at home.',
    price: { original: 45900, discounted: 42900 },
    category: ['beauty', 'haircare'],
    brand: 'Dyson',
    images: [getProductImage('dysonairwrap', 1), getProductImage('dysonairwrap', 2), getProductImage('dysonairwrap', 3)],
    stock: 34,
    ratings: { average: 4.9, count: 2345 },
    status: 'in_stock'
  },

  // ==================== SPORTS & OUTDOORS (30 products) ====================

  // Fitness Equipment (15)
  {
    id: 'sports-001',
    name: 'Bowflex SelectTech 552 Dumbbells',
    description: 'Adjustable dumbbells replacing 15 sets. Space-saving design with dial system. 5-52.5 lbs per dumbbell.',
    price: { original: 34999, discounted: 29999 },
    category: ['sports', 'fitness'],
    brand: 'Bowflex',
    images: [getProductImage('bowflex', 1), getProductImage('bowflex', 2)],
    stock: 45,
    ratings: { average: 4.8, count: 1234 },
    status: 'in_stock'
  },
  {
    id: 'sports-002',
    name: 'Peloton Bike+',
    description: 'Premium indoor cycling bike with rotating HD touchscreen. Access thousands of live and on-demand classes.',
    price: { original: 249900, discounted: 219900 },
    category: ['sports', 'fitness'],
    brand: 'Peloton',
    images: [getProductImage('peloton', 1), getProductImage('peloton', 2), getProductImage('peloton', 3)],
    stock: 12,
    ratings: { average: 4.9, count: 876 },
    status: 'in_stock'
  },

  // Outdoor Gear (15)
  {
    id: 'sports-021',
    name: 'The North Face Apex Bionic Jacket',
    description: 'Versatile soft-shell jacket with wind and water resistance. Perfect for hiking and everyday wear.',
    price: { original: 12999, discounted: 10999 },
    category: ['sports', 'outdoor'],
    brand: 'The North Face',
    images: [getProductImage('tnfapex', 1), getProductImage('tnfapex', 2)],
    stock: 89,
    ratings: { average: 4.7, count: 2134 },
    status: 'in_stock'
  },

  // ==================== HOME & GARDEN (20 products) ====================

  // Furniture (10)
  {
    id: 'home-001',
    name: 'IKEA POÄNG Armchair',
    description: 'Classic bentwood armchair with cushion. Comfortable and timeless Scandinavian design. Layer-glued bent wood frame.',
    price: { original: 12999, discounted: 9999 },
    category: ['home', 'furniture'],
    brand: 'IKEA',
    images: [getProductImage('poang', 1), getProductImage('poang', 2)],
    stock: 67,
    ratings: { average: 4.6, count: 3456 },
    status: 'in_stock'
  },

  // Kitchen Appliances (10)
  {
    id: 'home-021',
    name: 'Ninja Foodi 14-in-1 Air Fryer',
    description: 'Versatile pressure cooker and air fryer combo. TenderCrisp Technology for crispy results. 14 cooking functions.',
    price: { original: 29999, discounted: 24999 },
    category: ['home', 'kitchen'],
    brand: 'Ninja',
    images: [getProductImage('ninjafoodi', 1), getProductImage('ninjafoodi', 2)],
    stock: 56,
    ratings: { average: 4.8, count: 4321 },
    status: 'in_stock'
  }
];

// Add 200+ more products programmatically to reach 250+
const generateAdditionalProducts = () => {
  const additionalProducts = [];
  let id = 100;

  // Generate more products across all categories
  const productTemplates = [
    { category: 'electronics', types: ['smartphone', 'laptop', 'tablet', 'smartwatch', 'headphones', 'camera', 'speaker', 'monitor', 'keyboard', 'mouse'] },
    { category: 'fashion', types: ['shirt', 't-shirt', 'jeans', 'dress', 'sneakers', 'jacket', 'sweater', 'shorts', 'skirt', 'hoodie'] },
    { category: 'beauty', types: ['serum', 'moisturizer', 'cleanser', 'sunscreen', 'foundation', 'mascara', 'eyeshadow', 'blush', 'shampoo', 'conditioner'] },
    { category: 'sports', types: ['yoga-mat', 'dumbbells', 'resistance-bands', 'running-shoes', 'sports-watch', 'water-bottle', 'gym-bag', 'foam-roller'] },
    { category: 'home', types: ['bedsheets', 'pillows', 'curtains', 'rug', 'lamp', 'vase', 'wall-art', 'storage-box', 'mirror', 'clock'] }
  ];

  const brands = {
    electronics: ['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'HP', 'Asus', 'Lenovo', 'Acer', 'Microsoft'],
    fashion: ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Uniqlo', 'Gap', 'Forever 21', 'Levi\'s', 'Calvin Klein'],
    beauty: ['L\'Oreal', 'Maybelline', 'NYX', 'Revlon', 'Neutrogena', 'Cetaphil', 'Garnier', 'Olay', 'Ponds'],
    sports: ['Nike', 'Adidas', 'Under Armour', 'Reebok', 'Puma', 'Decathlon', 'Cosco', 'Nivia'],
    home: ['IKEA', 'Home Centre', 'Urban Ladder', 'Pepperfry', 'Godrej', 'Nilkamal', 'Duroflex']
  };

  productTemplates.forEach(template => {
    template.types.forEach((type, typeIndex) => {
      for (let i = 0; i < 20; i++) {
        const brand = brands[template.category][Math.floor(Math.random() * brands[template.category].length)];
        const basePrice = Math.floor(Math.random() * 50000) + 1000;
        const discount = Math.floor(basePrice * (Math.random() * 0.3 + 0.1));

        additionalProducts.push({
          id: `${template.category}-${id++}`,
          name: `${brand} ${type.replace('-', ' ')} ${i + 1}`,
          description: `Premium ${type.replace('-', ' ')} from ${brand}. High quality product with excellent features and durability. Perfect for everyday use.`,
          price: { original: basePrice, discounted: basePrice - discount },
          category: [template.category, type],
          brand: brand,
          images: [
            getProductImage(`${template.category}${type}`, i * 3 + 1),
            getProductImage(`${template.category}${type}`, i * 3 + 2),
            getProductImage(`${template.category}${type}`, i * 3 + 3)
          ],
          stock: Math.floor(Math.random() * 200) + 10,
          ratings: {
            average: (Math.random() * 1.5 + 3.5).toFixed(1),
            count: Math.floor(Math.random() * 5000) + 100
          },
          status: Math.random() > 0.1 ? 'in_stock' : 'out_of_stock',
          specifications: {
            feature1: 'Premium Quality',
            feature2: 'Durable Build',
            feature3: 'Best-in-class Performance'
          }
        });
      }
    });
  });

  return additionalProducts;
};

// Combine base products with generated ones
export const allProducts = [...products, ...generateAdditionalProducts()];

console.log(`Total Products: ${allProducts.length}`);
