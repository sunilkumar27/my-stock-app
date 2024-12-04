// src/components/stock/SearchBar.tsx
import React, { useState, useRef, useEffect } from "react";
import { useStock } from "../../context/StockContext.tsx";
import { Input } from "../common/Input.tsx";
import { Stock } from "../../types/stock.ts";

export const SearchBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchStocks,
    searchResults,
    loading,
    clearSearch,
    setShowResults,
    selectStock,
  } = useStock();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      await searchStocks(value);
      setIsOpen(true);
    } else {
      clearSearch();
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsOpen(false);
      await searchStocks(searchQuery);
      setShowResults(true); // Show results when magnifier is clicked
    }
  };

  const handleSelectStock = (stock: Stock) => {
    setSearchQuery(stock.symbol);
    setIsOpen(false);
    clearSearch();
    setShowResults(true);
    selectStock(stock);
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative">
      <p className="text-sm text-gray-600 mb-2 ml-1">
        Enter stock symbol or company name
      </p>

      <Input
        inputProps={{
          value: searchQuery,
          onChange: handleSearchInput,
          onFocus: () => setIsOpen(true),
          placeholder: "Search for stocks...",
        }}
        onClear={handleClear}
        onSearch={handleSearch}
        showSearchIcon
      />

      {!loading && isOpen && searchQuery && searchResults.length > 0 && (
        <div
          className="absolute z-[100] w-full mt-2 bg-white border border-gray-200 
                      rounded-lg shadow-lg max-h-96 overflow-auto"
        >
          {searchResults.map((stock, index) => (
            <button
              key={stock.symbol}
              onClick={() => handleSelectStock(stock)}
              className={`
                w-full px-4 py-3 flex justify-between items-center 
                hover:bg-blue-50 transition-colors
                ${index !== 0 ? "border-t border-gray-100" : ""}
              `}
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  {stock.symbol}
                </span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">{stock.currency}</span>
              </div>
              <span className="text-sm text-gray-500 truncate max-w-[50%] text-right">
                {stock.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
