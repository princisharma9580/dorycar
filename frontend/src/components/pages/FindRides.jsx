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
        <div className="container mx-auto px-4 md:px-16 xl:px-24 py-8">
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

          {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 px-4 lg:px-8 py-8 bg-gray-50 min-h-screen"> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-8 py-8 bg-gray-50 min-h-screen">
            {/* Filter Sidebar */}
            {/* <aside className="lg:col-span-1 sticky top-24 rounded-lg border border-gray-300 bg-white shadow-md p-6"> */}
            <aside className="md:col-span-1 relative md:sticky md:top-20 rounded-lg border border-gray-300 bg-white shadow-md p-6 mb-6 md:mb-0 z-10 md:z-auto">
              <h2 className="text-xl font-bold mb-6 flex items-center text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Filters
              </h2>
              <div className="space-y-8 text-gray-700">
                {/* Location */}
                <section>
                  <h3 className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
                    Location
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-1 font-medium text-gray-600"
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
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-300 focus:ring-opacity-50 transition"
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
                        htmlFor="city"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        City
                      </label>
                      <select
                        id="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedState}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 focus:border-emerald-500 focus:ring focus:ring-emerald-300 focus:ring-opacity-50 transition"
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
                </section>

                {/* Departure Time */}
                <section>
                  <h3 className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
                    Departure Time
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500 font-mono tracking-wide">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:59</span>
                    </div>

                    {/* Range Slider (simplified for now) */}
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="1"
                      value={departureTime[0]}
                      onChange={(e) => handleDepartureTimeChange(e)}
                      className="w-full rounded-md cursor-pointer accent-emerald-600"
                    />
                    <div className="text-sm text-gray-700 font-semibold">
                      Between{" "}
                      <span className="text-emerald-600">
                        {departureTime[0]}:00
                      </span>{" "}
                      and{" "}
                      <span className="text-emerald-600">
                        {departureTime[1]}:00
                      </span>
                    </div>
                  </div>
                </section>

                {/* Price Range */}
                <section>
                  <h3 className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500 font-mono tracking-wide">
                      <span>₹0</span>
                      <span>₹1000</span>
                      <span>₹2000+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e)}
                      className="w-full rounded-md cursor-pointer accent-emerald-600"
                    />
                    <div className="text-sm text-gray-700 font-semibold">
                      Up to{" "}
                      <span className="text-emerald-600">₹{priceRange[0]}</span>
                    </div>
                  </div>
                </section>

                {/* Ride Preferences */}
                <section>
                  <h3 className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
                    Ride Preferences
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: "instantBooking",
                        label: "Instant booking",
                        state: instantBooking,
                        setter: setInstantBooking,
                      },
                      {
                        id: "ladiesOnly",
                        label: "Ladies only",
                        state: ladiesOnly,
                        setter: setLadiesOnly,
                      },
                      {
                        id: "petFriendly",
                        label: "Pet friendly",
                        state: petFriendly,
                        setter: setPetFriendly,
                      },
                      {
                        id: "smokingAllowed",
                        label: "Smoking allowed",
                        state: smokingAllowed,
                        setter: setSmokingAllowed,
                      },
                      {
                        id: "acVehicle",
                        label: "AC vehicle",
                        state: acVehicle,
                        setter: setAcVehicle,
                      },
                    ].map(({ id, label, state, setter }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between"
                      >
                        <label
                          htmlFor={id}
                          className="font-medium text-gray-700 cursor-pointer select-none"
                        >
                          {label}
                        </label>
                        <button
                          id={id}
                          type="button"
                          role="switch"
                          aria-checked={state ? "true" : "false"}
                          data-state={state ? "checked" : "unchecked"}
                          onClick={() => setter((v) => !v)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                            state ? "bg-emerald-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
                              state ? "translate-x-5" : "translate-x-0"
                            }`}
                          ></span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Minimum Driver Rating */}
                <section>
                  <h3 className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
                    Minimum Driver Rating
                  </h3>
                  <div className="flex items-center space-x-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleDriverRatingChange(rating)}
                        aria-label={`${rating} stars`}
                        className={`cursor-pointer rounded p-1 transition-colors ${
                          rating <= driverRating
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Apply Filters Button */}
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="w-full mt-6 rounded-md bg-emerald-600 px-4 py-3 text-white text-lg font-semibold shadow-lg hover:bg-emerald-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </aside>

            {/* Ride Results Area */}
            {/* <section className="md:col-span-3">
              <div className="rounded-lg bg-white md:shadow-md p-6 min-h-[70vh]">
                <RideResults />
              </div>
            </section> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FindRides;
