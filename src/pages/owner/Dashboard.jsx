import React, { useEffect, useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components and Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

// --- Dashboard Card Component ---
const DashboardCard = ({ title, value, icon }) => (
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

// --- Recent Bookings Table Component ---
const RecentBookingsTable = ({ bookings = [], currency }) => (
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
              <td className="px-4 py-2">{booking.createdAt?.split("T")[0]}</td>
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

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenueByMonth: Array(12).fill(0),
    bookingsPerCarModel: [],
  });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("api/owner/dashboard");
      if (res.data.success) setData(res.data.dashboardData);
      else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) fetchDashboardData();
  }, [isOwner]);

  // --- Dashboard Cards ---
  const cards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  // --- Charts Data ---
  const bookingStatusData = {
    labels: ["Pending", "Confirmed", "Others"],
    datasets: [
      {
        data: [
          data.pendingBookings,
          data.completedBookings,
          Math.max(
            0,
            data.totalBookings - data.pendingBookings - data.completedBookings
          ),
        ],
        backgroundColor: ["#FBBF24", "#10B981", "#EF4444"],
        hoverOffset: 10,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: data.monthlyRevenueByMonth || Array(12).fill(0),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const bookingsPerCarModelData = {
    labels: data.bookingsPerCarModel?.map((b) => b.model) || [],
    datasets: [
      {
        label: "Bookings",
        data: data.bookingsPerCarModel?.map((b) => b.count) || [],
        backgroundColor: "#10B981",
      },
    ],
  };

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance"
      />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-8">
        {cards.map((card, idx) => (
          <DashboardCard key={idx} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
          <h2 className="font-medium mb-2">Monthly Revenue</h2>
          <Line data={monthlyRevenueData} />
        </div>
        <div className="p-4 border border-gray-200 rounded-md bg-white shadow-sm">
          <h2 className="font-medium mb-2">Booking Status</h2>
          <Doughnut data={bookingStatusData} />
        </div>
        <div className="p-4 border border-gray-200 rounded-md md:col-span-2 bg-white shadow-sm">
          <h2 className="font-medium mb-2">Bookings per Car Model</h2>
          <Bar data={bookingsPerCarModelData} />
        </div>
      </div>

      {/* Recent Bookings Table */}
      <RecentBookingsTable
        bookings={data.recentBookings || []}
        currency={currency}
      />
    </div>
  );
};

export default Dashboard;
