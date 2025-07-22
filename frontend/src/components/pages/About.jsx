import React from "react";
import Footer from "../Footer";

const About = () => {
  return (
   <>
     <section className="bg-white text-green-900 py-24 px-4 md:px-16">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* About Us */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">About Us</h2>
          <p className="text-md leading-relaxed">
            Dorycar is on a mission to make commuting in India more efficient, affordable, and eco-friendly
            by connecting drivers and passengers for shared rides. With traffic congestion on the rise and
            pollution levels soaring, India needs a smarter way to commute. Dorycar provides that solution
            by enabling carpooling, which not only reduces the number of vehicles on the road but also cuts
            down on individual commuting costs. We are proud to be an Indian startup, contributing to the
            vision of a new India where commuting is seamless, sustainable, and community-driven.
          </p>
        </div>

        {/* Our Team */}
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-green-600">Our Team</h3>
          <p className="text-md leading-relaxed">
            Our team is a group of passionate individuals with backgrounds in technology, transportation,
            and sustainability, all united by the goal of revolutionizing commuting in India. We believe
            that by working together, we can make a significant impact on the way people travel.
          </p>
        </div>

        {/* Our Vision */}
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-green-600">Our Vision</h3>
          <p className="text-md leading-relaxed">
            Join us in making India's roads less congested, its air cleaner, and its commutes more
            enjoyable. Together, we can drive change, one ride at a time.
          </p>
        </div>
      </div>
    </section>
    <Footer />
   </>
  );
};

export default About;
