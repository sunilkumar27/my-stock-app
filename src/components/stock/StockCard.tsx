// src/components/stock/StockCard.tsx
import React from "react";
import { Stock } from "../../types/stock.ts";

interface StockCardProps {
  stock: Stock;
  onClick: () => void;
  index: number;
}

export const StockCard = ({ stock, onClick, index }: StockCardProps) => {
  return (
    <div className="animate-fadeIn">
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm hover:shadow-md p-6
                 transform hover:-translate-y-1 transition-all duration-300
                 border border-gray-100 hover:border-blue-100 cursor-pointer"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {stock.symbol}
              </h3>
              <p className="text-sm text-gray-500">{stock.name}</p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              {stock.currency}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Region</p>
              <p className="text-sm font-medium text-gray-800">
                {stock.region}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Type</p>
              <p className="text-sm font-medium text-gray-800">{stock.type}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {stock.marketOpen} - {stock.marketClose}
              </span>
              <span className="text-blue-600 font-medium">
                {stock.timezone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
