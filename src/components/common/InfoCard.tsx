import React from "react";

interface InfoCardProps {
  label: string;
  value: string;
}

export const InfoCard = ({ label, value }: InfoCardProps) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-300">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);
