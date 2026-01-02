import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 rounded-full">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
    </div>
  );
};

export default DashboardCard;
