import { motion } from "framer-motion";
import carVideo1 from "../assets/carVideo1.mp4";
import carVideo2 from "../assets/carVideo2.mp4";
import carVideo4 from "../assets/carVideo4.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative w-full h-screen md:h-[90vh] flex items-center justify-center px-4 md:px-16 py-10 overflow-hidden mt-15 mb-20">
      {/* VIDEO GRID */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT LARGE VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative rounded-2xl overflow-hidden group h-64 sm:h-80 md:h-full"
        >
          <video
            src={carVideo1}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        {/* RIGHT - TWO STACKED VIDEOS */}
        <div className="flex flex-col gap-6 h-full">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden group h-32 sm:h-40 md:h-1/2"
          >
            <video
              src={carVideo2}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden group h-32 sm:h-40 md:h-1/2"
          >
            <video
              src={carVideo4}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
        </div>
      </div>

      {/* TEXT + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2  -translate-y-1/2 text-center px-4 w-full md:w-auto"
      >
        <div className="bg-white/10 backdrop-blur-md px-6 py-6 rounded-2xl border border-white/20 shadow-xl max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            Drive Your Dream Car Today
          </h1>
          <p className="mt-3 text-sm sm:text-lg md:text-xl text-white/90">
            Affordable • Premium • Fast Bookings
          </p>

          <Link to="cars">
            <button className="mt-6 px-6 sm:px-8 py-3 text-black font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 transition shadow-md hover:shadow-lg">
              Book Now
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
