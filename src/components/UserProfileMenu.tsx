import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useAuth } from "@/components/ProtectedRoute";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

export default function UserProfileMenu() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode, handleDarkModeToggle] = useDarkMode();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <div className="flex flex-col gap-1 min-w-[210px] p-4 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-200 dark:border-gray-700">
        <span className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{user.email}</span>

        {/* Menu Links */}
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
          <span role="img" aria-label="Account Settings"> 464 </span> Account Settings
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
          <span role="img" aria-label="My Orders"> 4C4 </span> My Orders
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
          <span role="img" aria-label="Wishlist"> 49A </span> Wishlist
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
          <span role="img" aria-label="Cart"> 6D2 </span> Cart
        </button>

        {/* Divider */}
        <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

        {/* Dark Mode Toggle */}
        <button
          onClick={handleDarkModeToggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mb-1"
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-400" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Divider */}
        <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

        <button
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
