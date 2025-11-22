import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import Banner2 from "../components/Banner2";
const Home = () => {
  return (
    <>
      <Hero></Hero>
      <FeaturedSection></FeaturedSection>
      <Banner2></Banner2>
      <Banner></Banner>

      <Testimonial></Testimonial>
      <Newsletter></Newsletter>
    </>
  );
};

export default Home;
