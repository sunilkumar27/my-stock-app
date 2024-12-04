// src/components/common/MetricCard.tsx
import React from "react";

interface MetricCardProps {
  label: string;
  value: string;
}

export const MetricCard = ({ label, value }: MetricCardProps) => (
  <div
    className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 
                    transition-colors duration-300 rounded"
  >
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-900">{value}</p>
  </div>
);
