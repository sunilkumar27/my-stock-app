import React from "react";
import { StockList } from "../components/stock/StockList.tsx";
import { SearchBar } from "../components/stock/SearchBar.tsx";

export const HomePage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Stock Search</h1>
    <SearchBar />
    <StockList />
  </div>
);
