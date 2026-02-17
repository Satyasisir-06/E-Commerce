import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { setUser } from './store/slices/authSlice';

// Layout
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin
import AdminRoute from './components/auth/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import { useCartWishlistSync } from './hooks/useCartWishlistSync';
import { ToastProvider } from './contexts/ToastContext';

function AppContent() {
  const dispatch = useDispatch();

  // Initialize cart and wishlist sync
  useCartWishlistSync();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. Immediately dispatch basic user info to stop the loading spinner
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'buyer', // Default role while fetching
        }));

        // 2. Fetch additional user data from Firestore in the background
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              ...userData,
            }));
          }
        } catch (error) {
          console.error('Error fetching supplementary user data:', error);
          // User is already authenticated with basic info, so we don't need to do anything else here
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      {/* Auth Pages (No Layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Main Pages (With Layout) */}
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/products" element={<Layout><ProductListingPage /></Layout>} />
      <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />

      {/* Protected Routes - Require Authentication */}
      <Route path="/cart" element={<Layout><ProtectedRoute><CartPage /></ProtectedRoute></Layout>} />
      <Route path="/wishlist" element={<Layout><ProtectedRoute><WishlistPage /></ProtectedRoute></Layout>} />
      <Route path="/checkout" element={<Layout><ProtectedRoute><CheckoutPage /></ProtectedRoute></Layout>} />
      <Route path="/order-confirmation/:orderId" element={<Layout><ProtectedRoute><OrderConfirmationPage /></ProtectedRoute></Layout>} />
      <Route path="/profile" element={<Layout><ProtectedRoute><ProfilePage /></ProtectedRoute></Layout>} />
      <Route path="/my-orders" element={<Layout><ProtectedRoute><MyOrdersPage /></ProtectedRoute></Layout>} />

      {/* Admin Routes - Require Admin Role */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<div className="p-8"><h1 className="text-2xl font-bold">Customers - Coming Soon</h1></div>} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
      </Route>

      {/* Category shortcuts */}
      <Route path="/categories" element={<Layout><ProductListingPage /></Layout>} />
      <Route path="/deals" element={<Layout><ProductListingPage /></Layout>} />

      {/* 404 */}
      <Route path="*" element={
        <Layout>
          <div className="container-custom py-16 text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">404</h1>
            <p className="text-muted mb-8">Page not found</p>
            <a href="/" className="btn-primary">Go Home</a>
          </div>
        </Layout>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ToastProvider>
  );
}
