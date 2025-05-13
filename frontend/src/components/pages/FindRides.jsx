import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RideResults from "../rides/RideResults";

function FindRides() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });
  const sliderRef = useRef(null);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [departureTime, setDepartureTime] = useState([6, 18]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [instantBooking, setInstantBooking] = useState(false);
  const [ladiesOnly, setLadiesOnly] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [acVehicle, setAcVehicle] = useState(false);
  const [driverRating, setDriverRating] = useState(4);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleDepartureTimeChange = (e) => {
    const newDepartureTime = e.target.value.split(",");
    setDepartureTime([
      parseInt(newDepartureTime[0]),
      parseInt(newDepartureTime[1]),
    ]);
  };

  const handlePriceRangeChange = (e) => {
    const newPriceRange = e.target.value.split(",");
    setPriceRange([parseInt(newPriceRange[0]), parseInt(newPriceRange[1])]);
  };

  const handleToggle = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleDriverRatingChange = (rating) => {
    setDriverRating(rating);
  };
  useEffect(() => {
    // Fetch all Indian states
    fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
      headers: {
        "X-CSCAPI-KEY":
          "N3JyOXpNbzlsemxlOGZGanU5MGtvbUZOWEZId1B6am5JN2hCOWVkYg==",
      },
    })
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "N3JyOXpNbzlsemxlOGZGanU5MGtvbUZOWEZId1B6am5JN2hCOWVkYg==",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setCities(data));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty(
        "--radix-slider-thumb-transform",
        "translateX(-50%)"
      );
    }
  }, []);

  const handleSearch = () => {
    const hasSearch =
      searchParams.from.trim() || searchParams.to.trim() || searchParams.date;

    if (!hasSearch) {
      toast.warn("Please fill in the search field");
      return;
    }

    const params = {};

    if (searchParams.from.trim()) {
      params.origin = searchParams.from.trim();
    }

    if (searchParams.to.trim()) {
      params.destination = searchParams.to.trim();
    }

    if (searchParams.date) {
      params.date = new Date(searchParams.date).toISOString();
    }

    navigate("/rides", { state: params });
  };

  return (
    <>
      <div className="flex-grow mt-16">
        <div className="container mx-auto px-24 py-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <p className="text-gray-600 mb-6">
              {" "}
              Complete your profile first to book a ride.{" "}
              <span>
                <button
                  className="text-white bg-blue-500 p-1 px-2 rounded-md"
                  onClick={() => navigate("/profile")}
                >
                  {" "}
                  click{" "}
                </button>
              </span>{" "}
              to complete profile.
            </p>
            <form
              className="grid grid-cols-1 md:grid-cols-5 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              {/* From Field */}
              <div className="relative">
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
                  className="lucide lucide-map-pin absolute left-3 top-3 h-5 w-5 text-emerald-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-emerald-200 focus:border-emerald-500"
                  placeholder="From"
                  type="text"
                  value={searchParams.from || ""}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      from: e.target.value,
                    })
                  }
                />
              </div>

              {/* To Field */}
              <div className="relative">
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
                  className="lucide lucide-map-pin absolute left-3 top-3 h-5 w-5 text-emerald-600"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-emerald-200 focus:border-emerald-500"
                  placeholder="To"
                  type="text"
                  value={searchParams.to || ""}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      to: e.target.value,
                    })
                  }
                />
              </div>

              {/* Date Field */}
              <div className="relative">
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
                  className="lucide lucide-calendar absolute left-3 top-3 h-5 w-5 text-emerald-600"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-emerald-200 focus:border-emerald-500"
                  placeholder="When"
                  type="date"
                  value={searchParams.date || ""}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, date: e.target.value })
                  }
                />
              </div>

              {/* Passengers Field */}
              <div className="relative">
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
                  className="lucide lucide-users absolute left-3 top-3 h-5 w-5 text-emerald-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-emerald-200 focus:border-emerald-500"
                  placeholder="Passengers"
                  min="1"
                  type="number"
                  value={searchParams.passengers || 1}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      passengers:
                        e.target.value === "" ? "" : parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleSearch}
              >
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
                  className="lucide lucide-search h-5 w-5 mr-2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Search
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm sticky top-24"
                data-v0-t="card"
              >
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
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
                      className="lucide lucide-filter h-5 w-5 mr-2 text-emerald-600"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filters
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Location</h3>
                      <div className="space-y-3">
                        <div>
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600 mb-1 block"
                            htmlFor="state"
                          >
                            State
                          </label>
                          <select
                            id="state"
                            value={selectedState}
                            onChange={(e) => {
                              setSelectedState(e.target.value);
                              setSelectedCity("");
                            }}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                          >
                            <option value="">All States</option>
                            {states.map((state) => (
                              <option key={state.iso2} value={state.iso2}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600 mb-1 block"
                            htmlFor="city"
                          >
                            City
                          </label>
                          <select
                            id="city"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            disabled={!selectedState}
                          >
                            <option value="">All Cities</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Departure Time
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>00:00</span>
                          <span>12:00</span>
                          <span>23:59</span>
                        </div>
                        <span
                          ref={sliderRef}
                          dir="ltr"
                          data-orientation="horizontal"
                          aria-disabled="false"
                          className="relative flex w-full touch-none select-none items-center"
                        >
                          <span
                            data-orientation="horizontal"
                            className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
                          >
                            <span
                              data-orientation="horizontal"
                              className="absolute h-full bg-primary"
                              style={{ left: "25%", right: "25%" }}
                            ></span>
                          </span>
                          <span
                            style={{
                              transform: "var(--radix-slider-thumb-transform)",
                              position: "absolute",
                              left: "calc(25% + 5px)",
                            }}
                          >
                            <span
                              role="slider"
                              aria-valuemin="0"
                              aria-valuemax="24"
                              aria-orientation="horizontal"
                              data-orientation="horizontal"
                              tabIndex="0"
                              className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                              data-radix-collection-item=""
                              aria-label="Minimum"
                              aria-valuenow="6"
                            ></span>
                          </span>
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          step="1"
                          value={departureTime[0]}
                          onChange={(e) => handleDepartureTimeChange(e)}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-600">
                          Between{" "}
                          <span className="font-medium">
                            {departureTime[0]}:00
                          </span>{" "}
                          and{" "}
                          <span className="font-medium">
                            {departureTime[1]}:00
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-3">Price Range</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>₹0</span>
                          <span>₹1000</span>
                          <span>₹2000</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="100"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(e)}
                          className="w-full"
                        />
                        <span
                          ref={sliderRef}
                          dir="ltr"
                          data-orientation="horizontal"
                          aria-disabled="false"
                          className="relative flex w-full touch-none select-none items-center"
                        ></span>
                        <span
                          data-orientation="horizontal"
                          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
                        >
                          <span
                            data-orientation="horizontal"
                            className="absolute h-full bg-primary"
                            style={{ left: "0%", right: "50%" }}
                          ></span>
                        </span>
                        <span
                          style={{
                            transform: "var(--radix-slider-thumb-transform)",
                            position: "absolute",
                            left: "calc(0% + 10px)",
                          }}
                        >
                          <span
                            role="slider"
                            aria-valuemin="0"
                            aria-valuemax="2000"
                            aria-orientation="horizontal"
                            data-orientation="horizontal"
                            tabIndex="0"
                            className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            data-radix-collection-item=""
                            aria-label="Minimum"
                            aria-valuenow="0"
                          ></span>
                        </span>
                        <div className="text-sm text-gray-600">
                          Up to{" "}
                          <span className="font-medium">₹{priceRange[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Ride Preferences
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600"
                            htmlFor="instant-booking"
                          >
                            Instant booking
                          </label>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={instantBooking ? "true" : "false"}
                            data-state={
                              instantBooking ? "checked" : "unchecked"
                            }
                            value="on"
                            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                              instantBooking ? "bg-green-700" : "bg-slate-300"
                            }`}
                            id="instant-booking"
                            onClick={() => handleToggle(setInstantBooking)}
                          >
                            <span
                              data-state={
                                instantBooking ? "checked" : "unchecked"
                              }
                              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                                instantBooking
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            ></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600"
                            htmlFor="ladies-only"
                          >
                            Ladies only
                          </label>
                          <button
                            type="button"
                            role="switch"
                            aria-checked="false"
                            data-state="unchecked"
                            value="on"
                            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                              ladiesOnly ? "bg-green-700" : "bg-slate-300"
                            }`}
                            onClick={() => handleToggle(setLadiesOnly)}
                            id="ladies-only"
                          >
                            <span
                              data-state={ladiesOnly ? "checked" : "unchecked"}
                              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                                ladiesOnly ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600"
                            htmlFor="pet-friendly"
                          >
                            Pet friendly
                          </label>
                          <button
                            type="button"
                            role="switch"
                            aria-checked="false"
                            data-state="unchecked"
                            value="on"
                            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                              petFriendly ? "bg-green-700" : "bg-slate-300"
                            }`}
                            onClick={() => handleToggle(setPetFriendly)}
                            id="pet-friendly"
                          >
                            <span
                              data-state={petFriendly ? "checked" : "unchecked"}
                              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                                petFriendly ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600"
                            htmlFor="smoking-allowed"
                          >
                            Smoking allowed
                          </label>
                          <button
                            type="button"
                            role="switch"
                            aria-checked="false"
                            data-state="unchecked"
                            value="on"
                            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                              smokingAllowed ? "bg-green-700" : "bg-slate-300"
                            }`}
                            onClick={() => handleToggle(setSmokingAllowed)}
                            id="smoking-allowed"
                          >
                            <span
                              data-state={
                                smokingAllowed ? "checked" : "unchecked"
                              }
                              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                                smokingAllowed
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            ></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <label
                            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm text-gray-600"
                            htmlFor="ac-vehicle"
                          >
                            AC vehicle
                          </label>
                          <button
                            type="button"
                            role="switch"
                            aria-checked="false"
                            data-state="unchecked"
                            value="on"
                            className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer  items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                              acVehicle ? "bg-green-700" : "bg-slate-300"
                            }`}
                            onClick={() => handleToggle(setAcVehicle)}
                            id="ac-vehicle"
                          >
                            <span
                              data-state={acVehicle ? "checked" : "unchecked"}
                              className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                                acVehicle ? "translate-x-5" : "translate-x-0"
                              }`}
                            ></span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Minimum Driver Rating
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <svg
                            key={rating}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`lucide lucide-star h-5 w-5 ${
                              rating <= driverRating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            } cursor-pointer`}
                            onClick={() => handleDriverRatingChange(rating)}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                     onClick={handleSearch}
                     className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div dir="ltr" data-orientation="horizontal">
                {/* <div className="flex justify-between items-center mb-6">
                  <div
                    role="tablist"
                    aria-orientation="horizontal"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
                    tabIndex="0"
                    data-orientation="horizontal"
                    style={{ outline: "none" }}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected="true"
                      aria-controls="radix-«rb»-content-all"
                      data-state="active"
                      id="radix-«rb»-trigger-all"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      tabIndex="-1"
                      data-orientation="horizontal"
                      data-radix-collection-item=""
                    >
                      All Rides
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="radix-«rb»-content-best"
                      data-state="inactive"
                      id="radix-«rb»-trigger-best"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      tabIndex="-1"
                      data-orientation="horizontal"
                      data-radix-collection-item=""
                    >
                      Best Matches
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="radix-«rb»-content-fastest"
                      data-state="inactive"
                      id="radix-«rb»-trigger-fastest"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      tabIndex="-1"
                      data-orientation="horizontal"
                      data-radix-collection-item=""
                    >
                      Fastest
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected="false"
                      aria-controls="radix-«rb»-content-cheapest"
                      data-state="inactive"
                      id="radix-«rb»-trigger-cheapest"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      tabIndex="-1"
                      data-orientation="horizontal"
                      data-radix-collection-item=""
                    >
                      Cheapest
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">12 rides found</p>
                </div> */}
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-«rb»-trigger-all"
                  id="radix-«rb»-content-all"
                  tabIndex="0"
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
                  style={{ animationDuration: "0s" }}
                >
                  {/* <div
                    className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    data-v0-t="card"
                  >
                    <div className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex justify-between mb-4">
                              <div>
                                <p className="text-lg font-bold">09:00</p>
                                <p className="text-sm text-gray-500">Mumbai</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">12:30</p>
                                <p className="text-sm text-gray-500">Pune</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-4">
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
                                className="lucide lucide-clock h-4 w-4 mr-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>3h 30m • </span>
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
                                className="lucide lucide-users h-4 w-4 mx-1"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span>3 seats available • </span>
                              <span>May 15, 2025</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                AC
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                2 bags max
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                No smoking
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:min-w-[150px]">
                            <div className="flex flex-col items-center">
                              <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mb-2">
                                <img
                                  className="aspect-square h-full w-full"
                                  alt="Amit Sharma"
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/diverse-group-zWYqC8IDf1vB2UcLXHZJNFY5ssQWG2.png"
                                />
                              </span>
                              <div className="text-center">
                                <p className="font-medium text-sm">Amit S.</p>
                                <div className="flex items-center">
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
                                    className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                  <span className="text-xs">4.8</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-600">
                                ₹450
                              </p>
                              <Link to="/rides/1">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700">
                                  Book
                                </button>
                              </Link>
                              <Link to="/messages/new?driver=1">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full mt-2">
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
                                    className="lucide lucide-message-square h-4 w-4 mr-1"
                                  >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                                  Contact
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    data-v0-t="card"
                  >
                    <div className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex justify-between mb-4">
                              <div>
                                <p className="text-lg font-bold">14:00</p>
                                <p className="text-sm text-gray-500">Mumbai</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">17:15</p>
                                <p className="text-sm text-gray-500">Pune</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-4">
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
                                className="lucide lucide-clock h-4 w-4 mr-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>3h 15m • </span>
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
                                className="lucide lucide-users h-4 w-4 mx-1"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span>2 seats available • </span>
                              <span>May 15, 2025</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                Music
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                AC
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                No smoking
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:min-w-[150px]">
                            <div className="flex flex-col items-center">
                              <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mb-2">
                                <img
                                  className="aspect-square h-full w-full"
                                  alt="Priya Desai"
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/diverse-group-zWYqC8IDf1vB2UcLXHZJNFY5ssQWG2.png"
                                />
                              </span>
                              <div className="text-center">
                                <p className="font-medium text-sm">Priya D.</p>
                                <div className="flex items-center">
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
                                    className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                  <span className="text-xs">4.6</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-600">
                                ₹400
                              </p>
                              <Link to="/rides/2">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700">
                                  Book
                                </button>
                              </Link>
                              <Link to="/messages/new?driver=2">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full mt-2">
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
                                    className="lucide lucide-message-square h-4 w-4 mr-1"
                                  >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                                  Contact
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    data-v0-t="card"
                  >
                    <div className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex justify-between mb-4">
                              <div>
                                <p className="text-lg font-bold">18:30</p>
                                <p className="text-sm text-gray-500">Mumbai</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">22:00</p>
                                <p className="text-sm text-gray-500">Pune</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                              <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-4">
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
                                className="lucide lucide-clock h-4 w-4 mr-1"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>3h 30m • </span>
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
                                className="lucide lucide-users h-4 w-4 mx-1"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span>1 seat available • </span>
                              <span>May 15, 2025</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                Luggage space
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                Quiet ride
                              </div>
                              <div
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                data-v0-t="badge"
                              >
                                No smoking
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:min-w-[150px]">
                            <div className="flex flex-col items-center">
                              <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mb-2">
                                <img
                                  className="aspect-square h-full w-full"
                                  alt="Rahul Patel"
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/diverse-group-zWYqC8IDf1vB2UcLXHZJNFY5ssQWG2.png"
                                />
                              </span>
                              <div className="text-center">
                                <p className="font-medium text-sm">Rahul P.</p>
                                <div className="flex items-center">
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
                                    className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                  <span className="text-xs">4.9</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-600">
                                ₹350
                              </p>
                              <Link to="/rides/3">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700">
                                  Book
                                </button>
                              </Link>
                              <Link to="/messages/new?driver=3">
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full mt-2">
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
                                    className="lucide lucide-message-square h-4 w-4 mr-1"
                                  >
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                  </svg>
                                  Contact
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <RideResults />
                </div>
                <div
                  data-state="inactive"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-«rb»-trigger-best"
                  hidden=""
                  id="radix-«rb»-content-best"
                  tabIndex="0"
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                ></div>
                <div
                  data-state="inactive"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-«rb»-trigger-fastest"
                  hidden=""
                  id="radix-«rb»-content-fastest"
                  tabIndex="0"
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                ></div>
                <div
                  data-state="inactive"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-«rb»-trigger-cheapest"
                  hidden=""
                  id="radix-«rb»-content-cheapest"
                  tabIndex="0"
                  className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindRides;
