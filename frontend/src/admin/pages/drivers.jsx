import { useEffect, useState } from "react";
import adminAuthService from "../services/adminAuthService";
import { FaStar } from "react-icons/fa";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {paginatedDrivers.map((driver, i) => {
              const initials = driver.name
                ? driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "N/A";
              const vehicle =
                driver.vehicle?.make && driver.vehicle?.model
                  ? `${driver.vehicle.make} ${driver.vehicle.model}`
                  : "N/A";
              const rating =
                typeof driver.averageRating === "number"
                  ? driver.averageRating.toFixed(1)
                  : "0";

              return (
                <div
                  key={i}
                  className="relative bg-white rounded-lg p-4 shadow-md border border-gray-200 transition hover:-translate-y-1 hover:shadow-lg duration-200"
                >
                  {/* Rating Badge */}
                  <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <FaStar className="text-green-600" /> {rating}
                  </span>

                  {/* Profile Image or Initials */}
                  <div className="flex justify-center mb-3">
                    {driver.profileImage ? (
                      <img
                        src={driver.profileImage}
                        alt={driver.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-semibold">
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Driver Info */}
                  <div className="text-center text-black">
                    <p className="font-bold text-lg">{driver.name || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      {driver.email || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {driver.phone || "N/A"}
                    </p>
                    <p className="text-sm italic text-gray-500 mt-1">
                      {vehicle}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="text-center mt-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {driver.status || "Unknown"}
                    </span>
                  </div>
                </div>
              );
            })}
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
