// src/components/layout/MainLayout.tsx
import { ReactNode } from "react";
import { Header } from "./Header.tsx";
import React from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 animate-fadeIn">
        {children}
      </main>
    </div>
  );
};
