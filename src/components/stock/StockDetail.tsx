// src/components/stock/StockDetail.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  formatLargeNumber,
  formatNumber,
  formatPercentage,
} from "../../utils/formatters.ts";
import { stockApi } from "../../api/stockApi.ts";
import { MetricCard } from "../common/MetricCard.tsx";
import { InfoCard } from "../common/InfoCard.tsx";

export const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stockDetails, setStockDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockDetails = async () => {
      if (!symbol) return;

      try {
        setLoading(true);
        const data = await stockApi.getStockDetails(symbol);
        setStockDetails(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch stock details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [symbol]);

  if (loading) {
    return null;
  }

  if (error || !stockDetails) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error Loading Stock
        </h2>
        <p className="text-red-600 mb-4">
          {error || "Failed to load stock details"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      <button
        onClick={() => navigate("/")}
        className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 
                 mb-6 transition-all duration-300 hover:-translate-x-1"
      >
        <span className="transform transition-transform group-hover:-translate-x-1">
          ←
        </span>
        <span>Back to Search</span>
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {stockDetails.Name}
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-blue-600 font-medium">
                  {stockDetails.Symbol}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">{stockDetails.Exchange}</span>
              </div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-blue-600 font-medium">
                {stockDetails.Currency}
              </p>
            </div>
          </div>

          {/* Company Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {stockDetails.Description}
            </p>
          </div>

          {/* Company Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <InfoCard label="Sector" value={stockDetails.Sector} />
            <InfoCard label="Industry" value={stockDetails.Industry} />
            <InfoCard label="Country" value={stockDetails.Country} />
            <InfoCard label="Asset Type" value={stockDetails.AssetType} />
          </div>
        </div>
      </div>

      {/* Metrics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Market Data */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Market Data
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MetricCard
              label="Market Cap"
              value={formatLargeNumber(stockDetails.MarketCapitalization)}
            />
            <MetricCard
              label="P/E Ratio"
              value={formatNumber(stockDetails.PERatio)}
            />
            <MetricCard
              label="EPS"
              value={formatNumber(stockDetails.EPS, "$")}
            />
            <MetricCard
              label="Dividend Yield"
              value={formatPercentage(stockDetails.DividendYield)}
            />
          </div>
        </div>

        {/* Technical Indicators */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Technical Indicators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <MetricCard
              label="52 Week High"
              value={formatNumber(stockDetails["52WeekHigh"], "$")}
            />
            <MetricCard
              label="52 Week Low"
              value={formatNumber(stockDetails["52WeekLow"], "$")}
            />
            <MetricCard
              label="50 Day MA"
              value={formatNumber(stockDetails["50DayMovingAverage"], "$")}
            />
            <MetricCard
              label="Target Price"
              value={formatNumber(stockDetails.AnalystTargetPrice, "$")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
