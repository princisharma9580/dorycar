import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:px-16 xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                alt="Dorycar Logo"
                className="h-10 mr-2"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
              />
            </div>
            <p className="text-gray-600 mb-4">
              Helping Others with Possible Move Approach
            </p>
            <p className="text-gray-600 mb-4">
              Connecting travelers for more sustainable, affordable journeys.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-emerald-600">
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-emerald-600">
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-emerald-600">
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
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Discover</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  to="/find-rides"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Find rides
                </Link>
              </li>
              <li>
                <Link
                  to="/offer-ride"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Offer a ride
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 hover:text-emerald-600"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2025 Dorycar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
