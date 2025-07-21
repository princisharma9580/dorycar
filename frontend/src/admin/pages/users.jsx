// import { useEffect, useState } from "react";
// import axios from "axios";
// import adminAuthService from "../services/adminAuthService";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const ITEMS_PER_PAGE = 12;

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rideCounts, setRideCounts] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState("");
//   const [rideFilter, setRideFilter] = useState("All Rides");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = adminAuthService.getToken();
//         if (!token) return;

//         const [usersRes, ridesRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/admin/users`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${API_BASE_URL}/admin/rides`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const fetchedUsers = usersRes.data;
//         const allRides = ridesRes.data || [];

//         localStorage.setItem("allRides", JSON.stringify(allRides));

//         const counts = {};
//         fetchedUsers.forEach((user) => {
//           const userRides = allRides.filter((ride) => {
//             const isAcceptor =
//               (Array.isArray(ride.acceptor) &&
//                 ride.acceptor.some((r) => r._id === user._id)) ||
//               ride.acceptor?._id === user._id;

//             const isCreator = ride.creator?._id === user._id;
//             const isValidStatus =
//               ride.status === "completed" || ride.status === "started";

//             return (isAcceptor || isCreator) && isValidStatus;
//           });

//           counts[user._id] = userRides.length;
//         });

//         setUsers(fetchedUsers);
//         setRideCounts(counts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users or rides:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// //       const fetchedUsers = usersRes.data;
// //       const allRides = ridesRes.data || [];
// // console.log("users data: ",usersRes)
// //       localStorage.setItem("allRides", JSON.stringify(allRides));

      
// //       const counts = {};

// fetchedUsers.forEach((user) => {
//   const userRides = allRides.filter((ride) => {
//     const isAcceptor =
//       (Array.isArray(ride.acceptor) &&
//         ride.acceptor.some((r) => r._id === user._id)) ||
//       ride.acceptor?._id === user._id;

//     const isCreator = ride.creator?._id === user._id;

//     const isValidStatus =
//       ride.status === "completed" || ride.status === "started";

//     return (isAcceptor || isCreator) && isValidStatus;
//   });

//   const sortedUsers = filteredUsers.sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );

//   const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
//   const paginatedUsers = sortedUsers.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="w-full p-6 font-sans text-sm text-gray-800 relative">
//       {/* Header Row */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <h2 className="text-2xl font-bold">Users</h2>
//         <div className="flex flex-wrap gap-3 items-center">
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
//           />
//           <select
//             value={rideFilter}
//             onChange={(e) => setRideFilter(e.target.value)}
//             className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
//           >
//             <option>All Rides</option>
//             <option>0 Rides</option>
//             <option>1+ Rides</option>
//           </select>
//           <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow-sm">
//             + Add User
//           </button>
//         </div>
//       </div>

//       {/* Users Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
//         {paginatedUsers.map((user, i) => {
//           const initials = user.name
//             ? user.name
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .toUpperCase()
//             : "N/A";
//           const rideCount = rideCounts[user._id] ?? 0;
//           const address =
//             user.address && user.address.trim() !== ""
//               ? user.address
//               : "No address provided";

//           return (
//             <div
//               key={i}
//               className="relative bg-gradient-to-br from-green-50 to-white rounded-xl p-4 shadow border border-green-100 transform transition-transform duration-200 hover:scale-[1.02]"
//             >
//               {/* Ride Count Badge - Outside Top Right */}
//               <div className="absolute -top-3 -right-0 z-10">
//                 <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
//                   {rideCount} {rideCount === 1 ? "Ride" : "Rides"}
//                 </span>
//               </div>

//               {/* Profile Image or Initials */}
//               <div className="flex justify-center mb-3">
//                 {user.profileImage ? (
//                   <img
//                     src={user.profileImage}
//                     alt={user.name}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-lg font-bold">
//                     {initials}
//                   </div>
//                 )}
//               </div>

//               {/* User Info */}
//               <div className="text-center">
//                 <p className="font-semibold text-base text-gray-800">
//                   {user.name || "N/A"}
//                 </p>
//                 <p className="text-gray-600 text-sm">{user.email || "N/A"}</p>
//                 <p className="text-gray-600 text-sm">{user.phone || "N/A"}</p>
//                 <p className="text-xs italic text-gray-500 mt-1">{address}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
      
// <div className="flex justify-center items-center gap-6 mt-8">
//   <button
//     disabled={currentPage === 1}
//     onClick={() => setCurrentPage((prev) => prev - 1)}
//     className={`px-4 py-1 rounded ${
//       currentPage === 1
//         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//         : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//     }`}
//   >
//     Previous
//   </button>

//   <span className="text-sm text-gray-700">
//     Page {currentPage} of {totalPages}
//   </span>

//   <button
//     disabled={currentPage === totalPages}
//     onClick={() => setCurrentPage((prev) => prev + 1)}
//     className={`px-4 py-1 rounded ${
//       currentPage === totalPages
//         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//         : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//     }`}
//   >
//     Next
//   </button>
// </div>

//     </div>
//   );
// };

// export default Users;

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

<<<<<<< HEAD
  // Filter + Search + Pagination logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const rideCount = rideCounts[user._id] ?? 0;

    if (rideFilter === "0 Rides") return matchesSearch && rideCount === 0;
    if (rideFilter === "1+ Rides") return matchesSearch && rideCount > 0;
=======
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.toLowerCase().includes(search.toLowerCase());

    const rideCount = rideCounts[user._id] ?? 0;

    if (rideFilter === "0 Rides") return matchesSearch && rideCount === 0;
    if (rideFilter === "1+ Rides") return matchesSearch && rideCount > 0;

>>>>>>> 0b9a4c1c4fede507a6073fb41682fb72ecf30e76
    return matchesSearch;
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
    <div className="w-full p-6 font-sans text-sm text-gray-800 relative">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
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
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow-sm">
            + Add User
          </button>
        </div>
      </div>

      {/* Users Grid */}
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
              {/* Ride Count Badge */}
              <div className="absolute -top-3 -right-0 z-10">
                <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  {rideCount} {rideCount === 1 ? "Ride" : "Rides"}
                </span>
              </div>

              {/* Profile or initials */}
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

              {/* User Info */}
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
