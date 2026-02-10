# 🛍️ ShopMart - Modern E-Commerce Platform

A full-stack e-commerce platform built with React, Firebase, and Tailwind CSS. Features product browsing, cart management, wishlist, checkout, order tracking, and a complete admin panel.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react) ![Firebase](https://img.shields.io/badge/Firebase-10.x-FFCA28?logo=firebase) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### 🛒 Customer Features
- **Product Catalog** - Browse 50+ products across categories (Electronics, Fashion, Beauty, Sports, Home & Garden)
- **Advanced Filtering** - Filter by category, price range, rating, and search
- **Shopping Cart** - Add/remove items, update quantities with real-time total
- **Wishlist** - Save favorite products for later
- **Secure Checkout** - Multi-step checkout with shipping address
- **Order Tracking** - View order history with status timeline (Placed → Processing → Shipped → Delivered)
- **User Profile** - Manage personal information (name, phone, address)
- **Toast Notifications** - Real-time feedback for all actions
- **Guest Shopping** - Cart persistence for non-logged-in users

### 👨‍💼 Admin Features
- **Dashboard** - Overview of sales, orders, and product metrics
- **Product Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Order Management** - View all orders and update statuses
- **Real-time Updates** - Firestore listeners for instant data sync

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach, works on all devices
- **Loading Skeletons** - Shimmer effects during data loading
- **Smooth Animations** - Fade-in, slide-in toast notifications
- **Modern Design** - Clean, minimalist interface with orange/teal theme

## 🚀 Tech Stack

- **React 18.3** + **Vite** - Fast development and build
- **Redux Toolkit** - State management (cart, wishlist, auth, products)
- **React Router DOM** - Client-side routing
- **Firebase Auth** - User authentication (Email/Password)
- **Firestore Database** - Real-time NoSQL database
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

## 📦 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd shopmart
npm install
```

### 2. Firebase Setup

Create a Firebase project at https://console.firebase.google.com

Enable:
- **Authentication** → Email/Password
- **Firestore Database** → Start in production mode
- **Storage** (optional - for product images)

### 3. Environment Variables

Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

See [`firebase_setup.md`](./firebase_setup.md) for detailed instructions.

### 4. Seed Database
```bash
npm run dev
```
Visit `http://localhost:5173/seed` and click **"Seed Database"** to add 50+ sample products.

### 5. Create Admin User

1. Register at `/register` with email: `admin@shopmart.com`
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document → Change `role` from `customer` to `admin`
4. Logout and login → You'll see "Admin Panel" in user dropdown

## 📁 Project Structure

```
shopmart/
├── src/
│   ├── components/
│   │   ├── admin/              # Admin dashboard components
│   │   ├── auth/               # ProtectedRoute, AdminRoute
│   │   ├── home/               # Homepage sections
│   │   ├── layout/             # Navbar, Footer
│   │   ├── product/            # ProductCard, ProductFilters
│   │   └── ui/                 # Button, Badge, Modal, Spinner
│   ├── contexts/               # ToastContext
│   ├── data/                   # Static product data
│   ├── hooks/                  # useCartWishlistSync
│   ├── pages/                  # All page components
│   ├── services/               # authService, orderService
│   ├── store/                  # Redux store + slices
│   ├── utils/                  # Helper functions, seedDatabase
│   ├── App.jsx                 # Main app with routes
│   ├── firebase.js             # Firebase config
│   └── main.jsx                # Entry point
├── .env                         # Environment variables
└── README.md
```

## 🎯 Key Features Implementation

### State Management (Redux)
- **authSlice** - User authentication state
- **cartSlice** - Shopping cart with localStorage persistence
- **wishlistSlice** - Wishlist with localStorage persistence
- **productSlice** - Product catalog from Firestore
- **orderSlice** - Order history and management

### Authentication Flow
- Email/Password registration and login
- Protected routes for cart, checkout, profile
- Admin-only routes for dashboard
- Auto-sync cart/wishlist on login (guest → authenticated)

### Real-time Data
- Firestore listeners for products and orders
- Auto-refresh when data changes
- Toast notifications for user actions

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
Add environment variables in Vercel dashboard → Settings → Environment Variables

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```
Set environment variables in Netlify dashboard

See [`deployment_guide.md`](./deployment_guide.md) for detailed instructions.

## 🔐 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /orders/{order} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Firestore Collections

### `products`
```javascript
{
  id: auto-generated
  name: string
  description: string
  price: { original: number, discounted: number }
  category: array
  brand: string
  images: array
  stock: number
  ratings: { average: number, count: number }
  status: 'in_stock' | 'out_of_stock'
  createdAt: timestamp
}
```

### `users`
```javascript
{
  id: user.uid
  email: string
  displayName: string
  role: 'customer' | 'admin'
  phone: string
  address: object
  createdAt: timestamp
}
```

### `orders`
```javascript
{
  id: auto-generated
  userId: string
  items: array
  shippingAddress: object
  paymentMethod: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: timestamp
}
```

## 🐛 Troubleshooting

**Issue: "Firebase not configured"**
- Check `.env` file exists and has all variables
- Restart dev server after adding `.env`

**Issue: "Products not loading"**
- Visit `/seed` to populate database
- Check Firebase Console → Firestore for `products` collection

**Issue: "Can't access admin panel"**
- Verify `role: 'admin'` in Firestore `users` collection
- Logout and login again

**Issue: "Toast notifications not showing"**
- Check browser console for errors
- Verify `ToastProvider` wraps `<App />`

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🎨 Design System

### Colors
- **Primary**: Orange (#f97316)
- **Secondary**: Teal (#14b8a6)
- **CTA**: Orange (#f97316)
- **Background**: Gray-50 (#f9fafb)
- **Foreground**: Slate-900 (#0f172a)

### Typography
- **Headings**: Rubik (Google Fonts)
- **Body**: Nunito Sans (Google Fonts)

## 🔮 Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- Email notifications (order confirmation, shipping updates)
- Product reviews and ratings
- Advanced search with filters
- Wishlist sharing
- Multi-language support (i18n)
- Product recommendations
- Promo codes and discounts

## 📧 Support

For issues or questions, create an issue on GitHub.

---

**Built with ❤️ using React + Firebase + Tailwind CSS**
