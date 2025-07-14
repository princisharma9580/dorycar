// import React from "react";
// import {
//   FaCalendarAlt,
//   FaCar,
//   FaMapMarkerAlt,
//   FaTachometerAlt,
//   FaRupeeSign,
// } from "react-icons/fa";

// const vehicles = [
//   {
//     id: "VH002",
//     name: "Honda CR-V",
//     year: "2022",
//     type: "SUV",
//     location: "Mumbai",
//     km: "8,500",
//     price: "1200",
//     status: "Rented",
//     features: ["AC", "GPS", "Sunroof"],
//   },
//   {
//     id: "VH004",
//     name: "Hyundai Creta",
//     year: "2022",
//     type: "SUV",
//     location: "Chennai",
//     km: "12,000",
//     price: "1100",
//     status: "Available",
//     features: ["AC", "GPS", "Bluetooth", "+1 more"],
//   },
//   {
//     id: "VH003",
//     name: "Maruti Swift",
//     year: "2023",
//     type: "Hatchback",
//     location: "Bangalore",
//     km: "5,200",
//     price: "600",
//     status: "Maintenance",
//     features: ["AC", "Music System"],
//   },
//   {
//     id: "VH001",
//     name: "Toyota Camry",
//     year: "2023",
//     type: "Sedan",
//     location: "Delhi",
//     km: "15,000",
//     price: "850",
//     status: "Available",
//     features: ["AC", "GPS", "Bluetooth"],
//   },
// ];

// const statusStyles = {
//   Available: "bg-green-100 text-green-700",
//   Rented: "bg-blue-100 text-blue-700",
//   Maintenance: "bg-orange-100 text-orange-700",
// };

// const VehicleListings = () => {
//   const availableVehicles = vehicles.filter((v) => v.status === "Available");

//   return (
//     <div className="px-8 py-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//         <FaCar className="text-lg" /> Vehicle Listings
//       </h1>
//       <p className="text-gray-500 mb-6">
//         Manage your fleet and vehicle availability
//       </p>

//       <div className="flex flex-wrap items-center gap-4 mb-6">
//         <input
//           placeholder="Search vehicles..."
//           className="px-4 py-2 border rounded w-60 text-sm shadow-sm"
//         />
//         <select className="px-4 py-2 border rounded text-sm shadow-sm">
//           <option>Available</option>
//         </select>
//         <select className="px-4 py-2 border rounded text-sm shadow-sm">
//           <option>All Types</option>
//           <option>SUV</option>
//           <option>Hatchback</option>
//           <option>Sedan</option>
//         </select>
//         <button className="px-4 py-2 border rounded text-sm shadow-sm">A-Z</button>
//         <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
//           + Add Vehicle
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
//         {availableVehicles.map((v, i) => (
//           <div
//             key={i}
//             className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between text-black transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
//           >
//             <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
//               <span>{v.id}</span>
//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[v.status]}`}
//               >
//                 {v.status}
//               </span>
//             </div>
//             <h2 className="font-bold text-lg text-gray-800 mb-1">{v.name}</h2>
//             <p className="text-sm text-gray-600 mb-1">
//               <FaCalendarAlt className="inline mr-1 text-green-600" /> {v.year}{" "}
//               {v.type}
//             </p>
//             <p className="text-sm text-gray-600 mb-1">
//               <FaMapMarkerAlt className="inline mr-1 text-green-600" />{" "}
//               {v.location}
//             </p>
//             <p className="text-sm text-gray-600 mb-1">
//               <FaTachometerAlt className="inline mr-1 text-green-600" /> {v.km} km
//             </p>
//             <p className="text-md font-semibold text-green-700 mb-2">
//               <FaRupeeSign className="inline mr-1" /> {v.price}/day
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {v.features.map((f, j) => (
//                 <span
//                   key={j}
//                   className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//                 >
//                   {f}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center gap-4 text-gray-500 mt-6">
//         <button className="text-sm px-3 py-1 rounded border border-gray-300">
//           Previous
//         </button>
//         <span className="text-sm">Page 1 of 1</span>
//         <button className="text-sm px-3 py-1 rounded border border-gray-300">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VehicleListings;

import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaRupeeSign,
} from "react-icons/fa";

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusStyles = {
  Available: "bg-green-100 text-green-700",
  Rented: "bg-blue-100 text-blue-700",
  Maintenance: "bg-orange-100 text-orange-700",
};

const VehicleListings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const rideData = JSON.parse(localStorage.getItem("allRides")) || [];

  const vehicleMap = new Map();

  rideData.forEach((ride) => {
    const v = ride.vehicle;
    if (v && v._id && !vehicleMap.has(v._id)) {
      vehicleMap.set(v._id, {
        id: v._id,
        name: v.name,
        year: v.year,
        type: v.type,
        location: v.location,
        km: v.kmDriven,
        price: v.pricePerDay,
        features: v.features || [],
        status: ride.status,
      });
    }
  });

  setVehicles(Array.from(vehicleMap.values()));
  setLoading(false);
}, []);



  const availableVehicles = vehicles.filter((v) => v.status === "Available");

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
            />
            <select className="px-4 py-2 border rounded text-sm shadow-sm">
              <option>Available</option>
            </select>
            <select className="px-4 py-2 border rounded text-sm shadow-sm">
              <option>All Types</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Sedan</option>
            </select>
            <button className="px-4 py-2 border rounded text-sm shadow-sm">A-Z</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
              + Add Vehicle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {availableVehicles.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between text-black transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                  <span>{v.id}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[v.status]}`}
                  >
                    {v.status}
                  </span>
                </div>
                <h2 className="font-bold text-lg text-gray-800 mb-1">{v.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <FaCalendarAlt className="inline mr-1 text-green-600" /> {v.year}{" "}
                  {v.type}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <FaMapMarkerAlt className="inline mr-1 text-green-600" /> {v.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <FaTachometerAlt className="inline mr-1 text-green-600" /> {v.km} km
                </p>
                <p className="text-md font-semibold text-green-700 mb-2">
                  <FaRupeeSign className="inline mr-1" /> {v.price}/day
                </p>
                <div className="flex flex-wrap gap-2">
                  {v.features.map((f, j) => (
                    <span
                      key={j}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
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
