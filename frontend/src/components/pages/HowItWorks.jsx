import React from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <>
      <div className="flex-grow bg-white">
        <div className="container mx-auto py-12 mt-16 px-4 md:px-7 xl:px-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">How Dorycar Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dorycar connects drivers with empty seats to passengers heading
              the same way. Sharing your journey helps reduce travel costs, cut
              carbon emissions, and meet new people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Search or Publish a Ride</h3>
                <p className="text-gray-600 mb-6">
                  Looking for a ride? Search available journeys by entering your
                  departure, destination, and travel date. Want to offer a ride?
                  Publish your journey details and set your price.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Enter your starting point and destination</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Choose your travel date and time</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Set your preferences and requirements</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Connect &amp; Confirm</h3>
                <p className="text-gray-600 mb-6">
                  Found a match? Connect with your travel companion through our
                  secure messaging system. Discuss details, confirm your
                  booking, and prepare for your journey together.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Message drivers or passengers directly</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Review profiles and ratings</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Secure your booking with easy payment</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Travel Together</h3>
                <p className="text-gray-600 mb-6">
                  Meet at the agreed pickup point, enjoy your journey together,
                  and share the costs. After arriving at your destination, rate
                  your experience to help build our trusted community.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Meet at the designated pickup point</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Share the journey and make connections</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-check-big h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                    <span>Rate and review your experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-100"
                data-v0-t="card"
              >
                <div className="p-6 pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users h-6 w-6 text-emerald-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Verified Profiles</h3>
                  <p className="text-gray-600">
                    Travel with confidence knowing all users are verified
                    through phone, email, and ID verification.
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-100"
                data-v0-t="card"
              >
                <div className="p-6 pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin h-6 w-6 text-emerald-600"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Flexible Pickup</h3>
                  <p className="text-gray-600">
                    Choose convenient pickup and drop-off points along your
                    route for maximum convenience.
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-100"
                data-v0-t="card"
              >
                <div className="p-6 pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar h-6 w-6 text-emerald-600"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Regular Rides</h3>
                  <p className="text-gray-600">
                    Set up recurring rides for daily commutes or weekly trips to
                    save time and effort.
                  </p>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-100"
                data-v0-t="card"
              >
                <div className="p-6 pt-6">
                  <div className="mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-credit-card h-6 w-6 text-emerald-600"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                  <p className="text-gray-600">
                    Pay securely through our platform with multiple Indian
                    payment options including UPI.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-8 mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Trust &amp; Safety
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                Your safety is our top priority. We've built multiple features
                to ensure a secure carpooling experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield h-8 w-8 text-emerald-600"
                      >
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Verified Members</h3>
                      <p className="text-gray-600">
                        All users verify their identity through multiple
                        verification steps including government ID and phone
                        verification.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star h-8 w-8 text-emerald-600"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Rating System</h3>
                      <p className="text-gray-600">
                        Our community-driven rating system helps maintain
                        quality and trust between members.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-square h-8 w-8 text-emerald-600"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Secure Messaging</h3>
                      <p className="text-gray-600">
                        Our in-app messaging system lets you communicate without
                        sharing personal contact details.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-credit-card h-8 w-8 text-emerald-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <line x1="2" x2="22" y1="10" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Secure Transactions</h3>
                      <p className="text-gray-600">
                        All payments are processed securely through our platform
                        with multiple Indian payment options.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">
                  How much does it cost to use Dorycar?
                </h3>
                <p className="text-gray-600">
                  Dorycar is free to sign up and search for rides. Passengers
                  pay only for the rides they book, and drivers set their own
                  prices. We charge a small service fee to cover the platform's
                  operation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">
                  Is Dorycar available throughout India?
                </h3>
                <p className="text-gray-600">
                  Yes, Dorycar is available across India. We have the highest
                  activity between major cities like Delhi, Mumbai, Bangalore,
                  Chennai, Hyderabad, Kolkata, and Pune, but rides are available
                  nationwide.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">
                  How do I know if a driver or passenger is trustworthy?
                </h3>
                <p className="text-gray-600">
                  All users must verify their identity through our verification
                  process. You can also check user profiles, ratings, and
                  reviews from previous carpooling experiences before booking or
                  accepting a ride.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">
                  What payment methods are accepted?
                </h3>
                <p className="text-gray-600">
                  We accept all major Indian payment methods including UPI
                  (Google Pay, PhonePe, Paytm), credit/debit cards, net banking,
                  and wallet payments.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">
                  What if my ride is cancelled?
                </h3>
                <p className="text-gray-600">
                  If your ride is cancelled by the driver, you'll receive a full
                  refund. Our system will also help you find alternative rides
                  for your journey.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center ">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Indians who are already saving money, reducing
              their carbon footprint, and making new connections through
              carpooling.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/find-rides">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Find a Ride
                </button>
              </Link>
              <Link to="/offer-ride">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-11 rounded-md border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8">
                  Offer a Ride
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HowItWorks;
