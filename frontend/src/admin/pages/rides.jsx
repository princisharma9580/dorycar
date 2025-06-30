import { useEffect, useState, useMemo } from "react";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import {
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  FaUser,
  FaUserTie,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

const Rides = () => {
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 10;

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = adminAuthService.getToken();
        const res = await fetch(`${API_BASE_URL}/admin/rides`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch ride stats");

        const data = await res.json();
        setRides(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rides:", err.message);
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Filter rides based on status filter
  const filteredRides = useMemo(() => {
    if (statusFilter === "all") return rides;
    return rides.filter((ride) => ride.status === statusFilter);
  }, [rides, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);
  const paginatedRides = useMemo(() => {
    const start = (currentPage - 1) * ridesPerPage;
    return filteredRides.slice(start, start + ridesPerPage);
  }, [filteredRides, currentPage]);

  // Handle page change safely
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className=" max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between border-b pb-2">
        <h2 className="text-3xl font-semibold mb-6 text-black-800 ">
          Total Rides
        </h2>

        {/* Status Filter */}
        <FormControl
          variant="outlined"
          size="small"
          className="mb-10 min-w-[180px]"
        >
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            label="Filter by Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="started">Started</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress color="success" />
        </div>
      ) : filteredRides.length > 0 ? (
        <>
          {/* <div className="overflow-x-auto shadow border border-gray-20 mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" border border-gray-300  bg-green-50 sticky top-0 z-10">
                <tr>
                  {[
                    "Ride ID",
                    "Driver",
                    "Passenger",
                    "From",
                    "To",
                    "Fare",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-6 py-3 text-left text-sm font-medium text-green-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedRides.map((ride, i) => (
                  <tr
                    key={i}
                    className="hover:bg-green-50 transition duration-200"
                  >
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {ride._id}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {ride.creator?.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {Array.isArray(ride.acceptor)
                        ? ride.acceptor
                            .map((p) => p.name)
                            .filter(Boolean)
                            .join(", ")
                        : ride.acceptor?.name || "N/A"}
                    </td>

                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {ride.origin}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                      {ride.destination}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-sm font-semibold text-gray-700">
                      ₹{ride.price}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          ride.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : ride.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {ride.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
  {paginatedRides.map((ride, i) => (
    <div
      key={i}
      className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between text-black transition transform hover:-translate-y-1 hover:shadow-lg duration-200"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-600 font-medium">{ride._id}</span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            ride.status === "completed"
              ? "bg-green-100 text-green-700"
              : ride.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : ride.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {ride.status}
        </span>
      </div>

      <div className="flex items-center gap-2 font-semibold text-sm mt-1">
        <FaUserTie className="text-green-700" />
        {ride.creator?.name || "N/A"}
      </div>

      <div className="flex items-center gap-2 text-sm mt-1">
        <FaUser className="text-green-700" />
        Passenger:{" "}
        {Array.isArray(ride.acceptor)
          ? ride.acceptor.map((p) => p.name).filter(Boolean).join(", ")
          : ride.acceptor?.name || "N/A"}
      </div>

      <div className="flex items-center gap-2 text-sm mt-1">
        <FaMapMarkerAlt className="text-green-700" />
        {ride.origin} → {ride.destination}
      </div>

      <div className="flex items-center gap-2 text-md mt-2">
        <FaRupeeSign className="text-green-700" />
        ₹{ride.price}
      </div>
    </div>
  ))}
</div>



          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-4 text-green-700">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border border-green-400 hover:bg-green-100 disabled:opacity-50`}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border border-green-400 hover:bg-green-100 disabled:opacity-50`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Typography color="text.secondary">No rides found.</Typography>
      )}
    </div>
  );
};

export default Rides;
