import { useEffect, useState } from "react";
import axios from "axios";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rideCounts, setRideCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = adminAuthService.getToken();
      if (!token) {
        console.warn("Admin token not found");
        setLoading(false);
        return;
      }

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

      const counts = {};
      fetchedUsers.forEach((user) => {
        const completedRides = allRides.filter(
          (ride) =>
            ride.creator?._id === user._id && ride.status === "completed"
        );
        counts[user._id] = completedRides.length;
      });

      setUsers(fetchedUsers);
      setRideCounts(counts);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600 font-semibold">
        Loading users...
      </div>
    );
  if (users.length === 0)
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        No users found.
      </div>
    );

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-black-800 border-b pb-2">
        Users
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
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
              className="relative bg-white rounded-lg p-4 shadow-md border border-gray-200 transition hover:-translate-y-1 hover:shadow-lg duration-200"
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
                  <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-semibold">
                    {initials}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-bold text-lg text-black">{user.name || "N/A"}</p>
                <p className="text-sm text-gray-600">{user.email || "N/A"}</p>
                <p className="text-sm text-gray-600">{user.phone || "N/A"}</p>
                <p className="text-sm italic text-gray-500 mt-1">{address}</p>
              </div>
            </div>
          );
        })}
      </div>

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
    </div>
  );
};

export default Users;
