import React, { useEffect, useState } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import { motion } from "framer-motion";
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

const Dashboard = () => {
  const { axios, isOwner, token, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenueByMonth: Array(12).fill(0),
    bookingsPerCarModel: [],
  });

  useEffect(() => {
    if (token && isOwner) fetchDashboardData();
  }, [token, isOwner]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/api/owner/dashboard");
      if (res.data.success) {
        const d = res.data.dashboardData;
        setData({
          totalCars: d.totalCars || 0,
          totalBookings: d.totalBookings || 0,
          pendingBookings: d.pendingBookings || 0,
          completedBookings: d.completedBookings || 0,
          recentBookings: d.recentBookings || [],
          monthlyRevenueByMonth: d.monthlyRevenueByMonth || Array(12).fill(0),
          bookingsPerCarModel: d.bookingsPerCarModel || [],
        });
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Chart data
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
        backgroundColor: ["#FACC15", "#34D399", "#F87171"],
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
        data: data.monthlyRevenueByMonth,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const bookingsPerCarModelData = {
    labels: data.bookingsPerCarModel.length
      ? data.bookingsPerCarModel.map((b) => b.model)
      : ["No Data"],
    datasets: [
      {
        label: "Bookings",
        data: data.bookingsPerCarModel.length
          ? data.bookingsPerCarModel.map((b) => b.count)
          : [0],
        backgroundColor: "#34D399",
      },
    ],
  };
  const cardInfo = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
      color: "bg-slate-50 text-slate-900",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
      color: "bg-slate-50 text-slate-900",
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      color: "bg-yellow-50 text-yellow-800",
    },
    {
      title: "Completed",
      value: data.completedBookings,
      icon: assets.listIconColored,
      color: "bg-green-50 text-green-800",
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-100 dark:bg-gray-900">
      <Title title="Owner Dashboard" subTitle="Monitor your cars & bookings" />

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cardInfo.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`relative overflow-hidden p-5 rounded-xl shadow hover:shadow-lg transition-shadow ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{card.title}</p>
                <h1 className="text-2xl font-bold mt-1">{card.value}</h1>
              </div>
              <img src={card.icon} alt="" className="w-7 h-7" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
            Revenue Analytics
          </h2>
          <Line data={monthlyRevenueData} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
            Booking Status
          </h2>
          <Doughnut data={bookingStatusData} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
            Most Booked Cars
          </h2>
          <Bar data={bookingsPerCarModelData} />
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-200">
          Recent Bookings
        </h2>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                data.recentBookings.map((booking, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {booking.car
                        ? `${booking.car.brand} ${booking.car.model}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {booking.createdAt
                        ? booking.createdAt.split("T")[0]
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {currency}
                      {booking.price || 0}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default Dashboard;
