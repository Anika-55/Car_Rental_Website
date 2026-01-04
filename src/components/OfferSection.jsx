// https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const OfferSection = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings animate on scroll */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight"
        >
          Get 15% Off Your Rental!
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white"
        >
          Choose Your Model
        </motion.h2>
      </div>

      {/* Footer Contact Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 bg-black/90 text-white py-6 sm:py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
          {/* Address */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4"
          >
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <div>
              <p className="text-sm sm:text-base md:text-lg">
                11 Rue de la Mutualité,
              </p>
              <p className="text-sm sm:text-base md:text-lg">92400 Paris</p>
            </div>
          </motion.div>

          {/* Phone & Email */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4"
          >
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <div>
              <p className="text-sm sm:text-base md:text-lg">
                Phone: (012) 345 6789 0123
              </p>
              <p className="text-sm sm:text-base md:text-lg flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 inline" />
                Email: luxe@example.com
              </p>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4"
          >
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <div>
              <p className="text-sm sm:text-base md:text-lg">
                Mon-Sat 09:00-23:00
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                Sunday is closed
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OfferSection;
