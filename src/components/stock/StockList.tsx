// src/components/stock/StockList.tsx
import { useNavigate } from "react-router-dom";
import { useStock } from "../../context/StockContext.tsx";
import { StockCard } from "./StockCard.tsx";
import React from "react";

export const StockList = () => {
  const { searchResults, showResults } = useStock();
  const navigate = useNavigate();

  if (!showResults) {
    return null;
  }

  if (searchResults?.length === 0) {
    return (
      <div className="flex justify-center items-center mt-6 p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">
          No stocks found matching your search criteria. Please try a different
          search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {searchResults.map((stock, index) => (
        <StockCard
          key={stock.symbol}
          stock={stock}
          index={index}
          onClick={() => navigate(`/stock/${stock.symbol}`)}
        />
      ))}
    </div>
  );
};
