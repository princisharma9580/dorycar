

import { useEffect, useState } from "react";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ITEMS_PER_PAGE = 10;

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = adminAuthService.getToken();
        const res = await fetch(`${API_BASE_URL}/admin/drivers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch drivers");
        const data = await res.json();
        setDrivers(data);
      } catch (err) {
        console.error("Error fetching drivers:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE);
  const paginatedDrivers = drivers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Drivers
      </h2>

      {loading ? (
        <div className="text-center text-gray-600 font-medium py-6">
          Loading drivers...
        </div>
      ) : paginatedDrivers.length === 0 ? (
        <div className="text-center text-gray-500 font-medium py-6">
          No drivers found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-3 border text-left text-green-700 font-semibold">Profile</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Name</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Email</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Phone</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Vehicle</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Rating</th>
                  <th className="p-3 border text-left text-green-700 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDrivers.map((driver, i) => (
                  <tr key={i} className="hover:bg-green-50 transition duration-200">
                    <td className="p-3 border">
                      {driver.profileImage ? (
                        <img
                          src={driver.profileImage}
                          alt={driver.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="p-3 border">{driver.name || "N/A"}</td>
                    <td className="p-3 border">{driver.email || "N/A"}</td>
                    <td className="p-3 border">{driver.phone || "N/A"}</td>
                    <td className="p-3 border">
                      {driver.vehicle?.make
                        ? `${driver.vehicle.make} ${driver.vehicle.model}`
                        : "N/A"}
                    </td>
                    <td className="p-3 border text-center">
                      {driver.averageRating?.toFixed(1) || "N/A"}
                    </td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          driver.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {driver.status || "Unknown"}
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Drivers;

