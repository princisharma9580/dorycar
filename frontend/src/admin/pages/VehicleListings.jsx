import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaRupeeSign,
} from "react-icons/fa";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VehicleListings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVehiclesFromUsers = async () => {
      try {
        const token = adminAuthService.getToken();
        const res = await fetch(`${API_BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        console.log("Fetched users:", data);

        const users = data || [];

        users.forEach((user, index) => {
          console.log(`User ${index} data:`, user);
        });

        const allVehicles = [];

        users.forEach((user) => {
          if (user.vehicle) {
            allVehicles.push({
              ...user.vehicle,
              ownerName: user.name,
              ownerEmail: user.email,
            });
          }
        });

        console.log("Extracted vehicles:", allVehicles);
        setVehicles(allVehicles);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicle data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiclesFromUsers();
  }, []);

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
        <FaCar className="text-lg" /> Vehicle Listings
      </h1>
      <p className="text-gray-500 mb-6">
        Manage your fleet and vehicle availability
      </p>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input
              placeholder="Search vehicles..."
              className="px-4 py-2 border rounded w-60 text-sm shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* <select className="px-4 py-2 border rounded text-sm shadow-sm">
              <option>All Types</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Sedan</option>
            </select>
            <button className="px-4 py-2 border rounded text-sm shadow-sm">A-Z</button> */}
            <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
              + Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {vehicles
            .filter((v) =>
              `${v.make} ${v.model} ${v.registration} ${v.type} ${v.ownerName}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((v, i) => (

              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between text-black transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                  <span>{v.registration || "N/A"}</span>
                  <span className="text-green-700 font-medium text-xs px-2 py-1 bg-green-100 rounded-full">
                    {v.type || "N/A"}
                  </span>
                </div>

                <h2 className="font-bold text-lg text-gray-800 mb-1 flex items-center gap-2">
                  <FaCar className="text-green-600" />
                  {v.make} {v.model}
                </h2>


                <p className="text-sm text-gray-600 mb-1">
                  <FaCalendarAlt className="inline mr-1 text-green-600" /> Year:{" "}
                  {v.year || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <FaMapMarkerAlt className="inline mr-1 text-green-600" /> Fuel:{" "}
                  {v.fuel || "N/A"}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <FaTachometerAlt className="inline mr-1 text-green-600" /> Color:{" "}
                  {v.color || "N/A"}
                </p>

                <p className="text-sm text-gray-500 mt-2 italic">
                  Owner: {v.ownerName} ({v.ownerEmail})
                </p>

                {v.vehicleImage && (
                  <img
                    src={v.vehicleImage}
                    alt={`${v.make} ${v.model}`}
                    className="mt-3 rounded-md w-full h-32 object-cover border"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 text-gray-500 mt-6">
            <button className="text-sm px-3 py-1 rounded border border-gray-300">
              Previous
            </button>
            <span className="text-sm">Page 1 of 1</span>
            <button className="text-sm px-3 py-1 rounded border border-gray-300">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleListings;
