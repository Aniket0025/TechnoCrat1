import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIFeatures from "./pages/AIFeatures";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProductList from "./pages/ProductList";
import ErrorBoundary from "@/components/ErrorBoundary";

import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";

import OrderSuccessPage from "@/pages/OrderSuccessPage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import AdminOrdersPage from "@/pages/AdminOrdersPage";
import ShopLocator from "@/pages/ShopLocator";
import UserProfile from "@/pages/UserProfile";
import ProductReviews from "@/pages/ProductReviews";
import CommunityForum from "@/pages/CommunityForum";

// Create a QueryClient instance
const queryClient = new QueryClient();

// Define the App component as a proper function component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ErrorBoundary>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ConditionalNavbar />
                <style>{`
                  .nav-link {
                    font-size: 1.08rem;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    transition: background 0.2s, color 0.2s;
                    color: #fff;
                  }
                  .nav-link:hover, .nav-link.active {
                    background: rgba(255,255,255,0.10);
                    color: #fff59d;
                  }
                `}</style>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/ai-features" element={<AIFeatures />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    <Route path="/admin-orders" element={<AdminOrdersPage />} />
                    <Route path="/auth/login" element={<Login redirectTo="/" />} />
                    <Route path="/auth/signup" element={<Signup redirectTo="/" />} />
                    <Route path="/shop-locator" element={<ShopLocator />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/reviews" element={<ProductReviews />} />
                    <Route path="/community" element={<CommunityForum />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TooltipProvider>
              </Router>
            </ErrorBoundary>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Navigation bar with auth-aware buttons
const NavbarWithAuth: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-green-700 via-green-500 to-green-700 text-white shadow-lg rounded-b-xl border-b border-green-200">
      <div className="flex gap-6 items-center">
        <img src="/ecocart-logo.png" alt="EcoCart Logo" className="w-10 h-10 rounded-full shadow border-2 border-green-200 bg-white" />
        <NavLink to="/" className={({ isActive }) => `font-bold text-2xl transition-colors duration-200 ${isActive ? 'text-yellow-200' : 'hover:text-yellow-200'}`}>EcoCart</NavLink>
        <NavLink to="/product-list" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
        <NavLink to="/reviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Reviews</NavLink>
        <NavLink to="/community" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Community Forum</NavLink>
<NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Leaderboard</NavLink>
      </div>
      <div className="flex gap-3 items-center">
        {/* Profile Dropdown */}
        {user ? (
          <ProfileDropdown user={user} onLogout={handleLogout} />
        ) : (
          <>
            <NavLink to="/auth/login" className="ml-3 bg-white text-green-700 px-4 py-2 rounded font-bold hover:bg-green-100 transition">Login</NavLink>
            <NavLink to="/auth/signup" className="ml-2 bg-yellow-100 text-green-900 px-4 py-2 rounded font-bold hover:bg-yellow-200 transition">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

// Only show navbar if not on login or register page
const ConditionalNavbar: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/signup");
  return hideNav ? null : <NavbarWithAuth />;
};

// ProfileDropdown component for Navbar
import React, { useState, useEffect } from "react"; 
import WishlistDrawer from "@/components/WishlistDrawer";

import Leaderboard from "@/pages/Leaderboard";

import type { User } from "firebase/auth";
import { User as UserIcon, ChevronDown } from "lucide-react";

const ProfileDropdown: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const dropdown = document.getElementById('profile-dropdown-menu');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-10 h-10 bg-white text-green-700 rounded-full shadow hover:bg-green-100 transition"
        onClick={() => setDropdownOpen((v) => !v)}
        aria-label="Open profile menu"
      >
        <UserIcon className="w-6 h-6" />
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      {dropdownOpen && (
        <div id="profile-dropdown-menu" className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 flex flex-col">
  <button className="px-4 py-2 text-left text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-900 transition-colors" onClick={() => { setDropdownOpen(false); navigate('/profile'); }}>👤 Account Settings</button>
  <button className="px-4 py-2 text-left text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-900 transition-colors" onClick={() => { setDropdownOpen(false); navigate('/admin-orders'); }}>🗂️ My Orders</button>
  <button className="px-4 py-2 text-left text-gray-800 font-medium text-base hover:bg-green-50 hover:text-green-900 transition-colors" onClick={() => { setDropdownOpen(false); setWishlistOpen(true); }}>💚 Wishlist</button>
  <div className="border-t my-1" />
  <button className="px-4 py-2 text-left text-red-600 font-medium text-base hover:bg-red-50 hover:text-red-700 transition-colors" onClick={() => { setDropdownOpen(false); onLogout(); }}>Logout</button>
</div>
      )}
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      
    </div>
  );
};

export default App;

