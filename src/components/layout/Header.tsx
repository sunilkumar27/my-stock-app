// src/components/layout/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <Link
          to="/"
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all"
        >
          Stock Tracker
        </Link>
      </nav>
    </header>
  );
};
