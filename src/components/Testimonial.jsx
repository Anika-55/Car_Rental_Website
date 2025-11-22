import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional",
    },
    {
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic",
    },
    {
      name: "Ava Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial:
        "I highly recommend CarRental ! Their fleet is amazing , and I always feel like I'm getting the best deal with excellent service",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 overflow-visible">
      {" "}
      <Title
        title="Whats Our Customers Say"
        subTitle="Discover why discerning travelers choose stayVenture for their luxury accommodations around the world."
      />
      ```
      {/* Ticker wrapper */}
      <div className="relative overflow-hidden mt-20">
        <motion.div
          className="flex gap-6"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[350px] flex-shrink-0 bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <img key={i} src={assets.star_icon} alt="star" />
                  ))}
              </div>

              <p
                className="text-gray-500 mt-4 font-light leading-6"
                style={{ whiteSpace: "normal" }}
              >
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
