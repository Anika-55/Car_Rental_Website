import React from "react";

const RecentBookingsTable = ({ bookings, currency }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg p-4 mb-8 bg-white shadow-sm">
      <h2 className="text-lg font-medium mb-4">Recent Bookings</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Car
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Price
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {booking.car.brand} {booking.car.model}
                </td>
                <td className="px-4 py-2">{booking.createdAt.split("T")[0]}</td>
                <td className="px-4 py-2">
                  {currency}
                  {booking.price}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookingsTable;
