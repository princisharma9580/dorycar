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
  TextField,
} from "@mui/material";
import { FaUser, FaUserTie, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const Rides = () => {
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredRides = useMemo(() => {
    const byStatus =
  statusFilter === "all"
    ? rides
    : statusFilter === "accepted"
    ? rides.filter(
        (ride) =>
          ride.status === "pending" &&
          ride.interestedUsers?.some((u) => u.status === "accepted")
      )
    : rides.filter((ride) => ride.status === statusFilter);

    const bySearch = byStatus.filter((ride) =>
      Array.isArray(ride.acceptor)
        ? ride.acceptor.some((p) =>
            p.name?.toLowerCase().includes(search.toLowerCase())
          )
        : ride.acceptor?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return bySearch;
  }, [rides, statusFilter, search]);

  const totalPages = Math.ceil(filteredRides.length / ridesPerPage);
  const paginatedRides = useMemo(() => {
    const start = (currentPage - 1) * ridesPerPage;
    return filteredRides.slice(start, start + ridesPerPage);
  }, [filteredRides, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Rides</h2>

        <div className="flex gap-3 w-full md:w-auto">
          <TextField
            variant="outlined"
            size="small"
            label="Search passengers..."
            className="w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl
            variant="outlined"
            size="small"
            className="min-w-[150px]"
          >
            <InputLabel id="status-filter-label">All Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              label="All Status"
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
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress color="success" />
        </div>
      ) : filteredRides.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
            {paginatedRides.map((ride, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedRide(ride);
                  setIsModalOpen(true);
                }}
                className={`cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-lg ${
                  ride.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : ride.status === "cancelled"
                    ? "bg-red-50 border-red-200"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{ride._id}</span>
                  {/* <span
                    className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                      ride.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : ride.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : ride.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                  </span> */}
                  {/* Determine display status dynamically */}
                {(() => {
                  const isAcceptedRide =
                    ride.status === "pending" &&
                    ride.interestedUsers?.some((u) => u.status === "accepted");

                  const displayStatus = isAcceptedRide
                    ? "Accepted"
                    : ride.status.charAt(0).toUpperCase() + ride.status.slice(1);

                  const badgeClass = isAcceptedRide
                    ? "bg-blue-100 text-blue-700"
                    : ride.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : ride.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : ride.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600";

                  return (
                    <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${badgeClass}`}>
                      {displayStatus}
                    </span>
                  );
                })()}

                </div>

                {/* Passenger */}
                <div className="text-base font-semibold text-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <FaUser className="text-green-600" />
                    <span>Passenger:</span>
                  </div>

                  <div className="flex flex-wrap gap-2 ml-2">
                    {ride.interestedUsers
                      ?.filter(
                        (u) =>
                          u.status !== "cancelled" && u.status !== "rejected"
                      )
                      .map((u, idx) =>
                        u.user?.name ? (
                          <span
                            key={idx}
                            className=" text-green-800 text-sm px-3 shadow-sm "
                          >
                            {u.user.name}
                          </span>
                        ) : null
                      )}
                    {ride.interestedUsers?.filter(
                      (u) => u.status !== "cancelled" && u.status !== "rejected"
                    ).length === 0 && (
                      <span className="text-gray-500 text-sm italic">N/A</span>
                    )}
                  </div>
                </div>

                {/* who offered the ride */}
                <div className="text-sm mt-1 text-gray-600 flex items-center gap-2">
                  <FaUserTie className="text-green-500" />
                  Offered by: {ride.creator?.name || "N/A"}
                </div>

                <div className="text-sm mt-1 text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  {ride.origin} → {ride.destination}
                </div>
                <div className="text-md mt-2 font-medium text-gray-900 flex items-center gap-1">
                  <FaRupeeSign className="text-green-700" /> ₹{ride.price}
                </div>
              </div>
            ))}
          </div>
          {selectedRide && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 ${
                isModalOpen ? "" : "hidden"
              }`}
            >
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Ride Details
                </h2>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>
                    <strong>ID:</strong> {selectedRide._id}
                  </li>
                  <li>
                    <strong>Status:</strong> {selectedRide.status}
                  </li>
                  <li>
                    <strong>Passengers:</strong>
                    <ul className="pl-4 list-disc">
                      {(selectedRide.interestedUsers || [])
                        .filter(
                          (u) =>
                            u.status !== "cancelled" && u.status !== "rejected"
                        )
                        .map((u, idx) => (
                          <li key={idx} className="text-sm text-gray-800">
                            {u.user?.name || "N/A"}{" "}
                            <span className="text-xs text-gray-500">
                              ({u.status})
                            </span>
                          </li>
                        ))}
                      {selectedRide.interestedUsers?.filter(
                        (u) =>
                          u.status !== "cancelled" && u.status !== "rejected"
                      ).length === 0 && (
                        <li className="text-sm text-gray-500">N/A</li>
                      )}
                    </ul>
                  </li>

                  <li>
                    <strong>Offered by:</strong>{" "}
                    {selectedRide.creator?.name || "N/A"} (
                    {selectedRide.creator?.email})
                  </li>
                  <li>
                    <strong>From:</strong> {selectedRide.origin}
                  </li>
                  <li>
                    <strong>To:</strong> {selectedRide.destination}
                  </li>
                  <li>
                    <strong>Departure:</strong>{" "}
                    {new Date(selectedRide.departureTime).toLocaleString()}
                  </li>
                  <li>
                    <strong>Arrival:</strong>{" "}
                    {new Date(selectedRide.arrivalTime).toLocaleString()}
                  </li>
                  <li>
                    <strong>Ride Date:</strong>{" "}
                    {new Date(selectedRide.date).toLocaleString()}
                  </li>
                  <li>
                    <strong>Price:</strong> ₹{selectedRide.price}
                  </li>
                  <li>
                    <strong>Payment Methods:</strong>{" "}
                    {selectedRide.paymentMethods?.join(", ") || "N/A"}
                  </li>
                  <li>
                    <strong>Preferred Communication:</strong>{" "}
                    {selectedRide.preferredCommunication}
                  </li>
                  <li>
                    <strong>Ride Preferences:</strong>
                    <ul className="pl-4 list-disc">
                      {Object.entries(selectedRide.ridePreference || {}).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value ? "Yes" : "No"}
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                  <li>
                    <strong>Interested Users:</strong>
                    <ul className="pl-4 list-disc">
                      {(selectedRide.interestedUsers || []).map((u, idx) => (
                        <li key={idx}>
                          {u.user?.name || "N/A"} - {u.status}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <div className="flex justify-end mt-6">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6 text-green-700">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-green-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-green-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Typography color="text.secondary" className="mt-6 text-center">
          No rides found.
        </Typography>
      )}
    </div>
  );
};

export default Rides;
