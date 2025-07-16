import { useEffect, useState } from "react";
import axios from "axios";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ITEMS_PER_PAGE = 12;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rideCounts, setRideCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rideFilter, setRideFilter] = useState("All Rides");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = adminAuthService.getToken();
        if (!token) return;

        const [usersRes, ridesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/admin/rides`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const fetchedUsers = usersRes.data;
        const allRides = ridesRes.data || [];

        localStorage.setItem("allRides", JSON.stringify(allRides));

        const counts = {};
        fetchedUsers.forEach((user) => {
          const userRides = allRides.filter((ride) => {
            const isAcceptor =
              (Array.isArray(ride.acceptor) &&
                ride.acceptor.some((r) => r._id === user._id)) ||
              ride.acceptor?._id === user._id;

            const isCreator = ride.creator?._id === user._id;
            const isValidStatus =
              ride.status === "completed" || ride.status === "started";

            return (isAcceptor || isCreator) && isValidStatus;
          });

          counts[user._id] = userRides.length;
        });

        setUsers(fetchedUsers);
        setRideCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users or rides:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    const matchName = user.name?.toLowerCase().includes(query);
    const matchEmail = user.email?.toLowerCase().includes(query);
    const rides = rideCounts[user._id] ?? 0;
    const rideMatch =
      rideFilter === "All Rides" ||
      (rideFilter === "0 Rides" && rides === 0) ||
      (rideFilter === "1+ Rides" && rides > 0);
    return (matchName || matchEmail) && rideMatch;
  });

  const sortedUsers = filteredUsers.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full p-6 font-sans text-sm text-gray-800">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Users</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 shadow-sm focus:outline-none"
        />
        <select
          value={rideFilter}
          onChange={(e) => setRideFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
        >
          <option>All Rides</option>
          <option>0 Rides</option>
          <option>1+ Rides</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {paginatedUsers.map((user, i) => {
          const initials = user.name
            ? user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "N/A";
          const rideCount = rideCounts[user._id] ?? 0;
          const address =
            user.address && user.address.trim() !== ""
              ? user.address
              : "No address provided";

          return (
            <div
              key={i}
              className="relative bg-gradient-to-br from-green-50 to-white rounded-xl p-4 shadow border border-green-100 transform transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                {rideCount} {rideCount === 1 ? "Ride" : "Rides"}
              </span>

              <div className="flex justify-center mb-3">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold">
                    {initials}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-semibold text-base text-gray-800">
                  {user.name || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">{user.email || "N/A"}</p>
                <p className="text-gray-600 text-sm">{user.phone || "N/A"}</p>
                <p className="text-xs italic text-gray-500 mt-1">{address}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600">
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
    </div>
  );
};

export default Users;
