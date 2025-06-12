import { useEffect, useState } from "react";
import axios from "axios";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = adminAuthService.getToken();
        if (!token) {
          console.warn("Admin token not found");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-green-800 border-b pb-2">
        Users
      </h2>
      {loading ? (
        <div className="text-center text-gray-600 font-medium py-6">
          Loading Users...
        </div>
      ) : paginatedUsers.length === 0 ? (
        <div className="text-center text-gray-500 font-medium py-6">
          No Users found.
        </div>
      ) : (
        <>
<div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-green-100">
            <tr>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Profile
              </th>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Name
              </th>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Email
              </th>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Phone
              </th>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Address
              </th>
              <th className="p-4 border border-gray-300 text-left text-green-700 font-semibold uppercase tracking-wide">
                Total Rides
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-green-50 transition-colors duration-200 cursor-pointer"
              >
                <td className="p-4 border border-gray-300">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-semibold">
                      N/A
                    </div>
                  )}
                </td>
                <td className="p-4 border border-gray-300 text-gray-800 font-medium">
                  {user.name || "N/A"}
                </td>
                <td className="p-4 border border-gray-300 text-gray-700 truncate max-w-xs">
                  {user.email || "N/A"}
                </td>
                <td className="p-4 border border-gray-300 text-gray-700">
                  {user.phone || "N/A"}
                </td>
                <td className="p-4 border border-gray-300 text-gray-700 truncate max-w-xs">
                  {user.address || "N/A"}
                </td>
                <td className="p-4 border border-gray-300 text-green-700 font-semibold text-center">
                  {user.rides ?? 0}
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

export default Users;
