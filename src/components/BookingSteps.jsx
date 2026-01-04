import React from "react";
import { motion } from "framer-motion";

const BookingSteps = () => {
  const features = [
    {
      title: "No Delays",
      description:
        "Timely departures and arrivals. Our drivers ensure you reach your destination on schedule, every time.",
    },
    {
      title: "High Quality",
      description:
        "Premium vehicles with modern amenities. Enjoy a comfortable and stylish ride.",
    },
    {
      title: "Premium Support",
      description:
        "24/7 customer service. Our team is always ready to assist with your travel needs.",
    },
    {
      title: "A Diverse Selection",
      description:
        "Choose from a variety of vehicle options to suit your journey.",
    },
  ];

  const cars = [
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
    "/images/car4.jpg",
  ];

  // Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[var(--color-light)] text-gray-900 py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Section */}
        <motion.div
          className="lg:w-1/2 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[var(--color-primary)] leading-snug"
          >
            Ride To Destinations
            <br />
            With Maximum Comfort
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-primary-dull)] uppercase tracking-widest"
          >
            Finest Transport
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="border-t border-[var(--color-borderColor)] w-20 mt-4"
          ></motion.div>

          {/* Features List */}
          <motion.div className="space-y-6 mt-6" variants={containerVariants}>
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-[var(--color-primary-dull)]">
                  {feature.title}
                </h3>
                <p className="text-gray-700 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Section - Stylish Car Grid */}
        <motion.div
          className="lg:w-1/2 w-full grid grid-cols-2 grid-rows-3 gap-4 h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Featured Image */}
          <motion.div className="row-span-3 col-span-1" variants={itemVariants}>
            <img
              src={cars[0]}
              alt="Car 1"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          {/* Other Cars */}
          {cars.slice(1).map((car, index) => (
            <motion.div
              key={index}
              className="col-span-1 row-span-1"
              variants={itemVariants}
            >
              <img
                src={car}
                alt={`Car ${index + 2}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSteps;
