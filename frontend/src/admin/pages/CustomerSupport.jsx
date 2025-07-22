// import React from "react";
// import { FaClock, FaCheckCircle, FaExclamationCircle, FaUser } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import api from "../services/api"; 
// import { toast } from "react-toastify";


// const CustomerSupport = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//   const fetchTickets = async () => {
//     try {
//       const response = await api.get("/ticket");
//       setTickets(response.data);
//     } catch (error) {
//       console.error("Failed to fetch tickets", error);
//       toast.error("Failed to load support tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchTickets();
// }, []);
//   return (
//     <div className="px-8 py-6">
//       {/* Page Title */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-1">Customer Support</h1>
//       <p className="text-gray-500 mb-6">
//         Manage customer queries and support tickets
//       </p>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Open Tickets</p>
//             <p className="text-2xl font-bold text-gray-800">12</p>
//           </div>
//           <span className="text-blue-500 text-xl">
//             📨
//           </span>
//         </div>
//         <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Avg Response Time</p>
//             <p className="text-2xl font-bold text-gray-800">2.4h</p>
//           </div>
//           <FaClock className="text-yellow-500 text-xl" />
//         </div>
//         <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Resolved Today</p>
//             <p className="text-2xl font-bold text-gray-800">8</p>
//           </div>
//           <FaCheckCircle className="text-green-500 text-xl" />
//         </div>
//         <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Urgent Issues</p>
//             <p className="text-2xl font-bold text-gray-800">3</p>
//           </div>
//           <FaExclamationCircle className="text-red-500 text-xl" />
//         </div>
//       </div>

//       {/* Tickets Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
//         <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 text-sm">
//           New Ticket
//         </button>
//       </div>

//       {/* Ticket List */}
//       <div className="space-y-4">
//         {/* Ticket 1 */}
//         <div className="bg-white border rounded-lg shadow p-4">
//           <div className="flex justify-between items-center mb-1 text-sm">
//             <span className="font-medium">SUP001</span>
//             <div className="flex gap-2">
//               <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
//                 Urgent
//               </span>
//               <span className="text-red-600 text-sm font-semibold">High Priority</span>
//             </div>
//           </div>
//           <p className="font-medium text-gray-800 mb-1">Vehicle breakdown during rental</p>
//           <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
//             <span className="flex items-center gap-1">
//               <FaUser /> Rahul Sharma
//             </span>
//             <span>Created: 20 Jan 2024</span>
//             <span>Category: Technical Issue</span>
//           </div>
//           <p className="text-xs text-gray-400 mt-2">Last updated: 20 Jan 2024</p>
//           <div className="flex justify-end mt-2">
//             <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100">
//               View Details
//             </button>
//           </div>
//         </div>

//         {/* Ticket 2 */}
//         <div className="bg-white border rounded-lg shadow p-4">
//           <div className="flex justify-between items-center mb-1 text-sm">
//             <span className="font-medium">SUP002</span>
//             <div className="flex gap-2">
//               <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
//                 In Progress
//               </span>
//               <span className="text-yellow-600 text-sm font-semibold">Medium Priority</span>
//             </div>
//           </div>
//           <p className="font-medium text-gray-800 mb-1">Refund request for cancelled booking</p>
//           <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
//             <span className="flex items-center gap-1">
//               <FaUser /> Priya Patel
//             </span>
//             <span>Created: 19 Jan 2024</span>
//             <span>Category: Billing</span>
//           </div>
//           <p className="text-xs text-gray-400 mt-2">Last updated: 20 Jan 2024</p>
//           <div className="flex justify-end mt-2">
//             <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100">
//               View Details
//             </button>
//           </div>
//         </div>

//         {/* Ticket 3 */}
//         <div className="bg-white border rounded-lg shadow p-4">
//           <div className="flex justify-between items-center mb-1 text-sm">
//             <span className="font-medium">SUP003</span>
//             <div className="flex gap-2">
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
//                 Resolved
//               </span>
//               <span className="text-green-600 text-sm font-semibold">Low Priority</span>
//             </div>
//           </div>
//           <p className="font-medium text-gray-800 mb-1">Unable to extend rental period</p>
//           <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
//             <span className="flex items-center gap-1">
//               <FaUser /> Aman Verma
//             </span>
//             <span>Created: 18 Jan 2024</span>
//             <span>Category: Rental</span>
//           </div>
//           <p className="text-xs text-gray-400 mt-2">Last updated: 20 Jan 2024</p>
//           <div className="flex justify-end mt-2">
//             <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100">
//               View Details
//             </button>
//           </div>
//         </div>
//         {/* Ticket 4 */}
//       <div className="bg-white border rounded-lg shadow p-4">
//         <div className="flex justify-between items-center mb-1 text-sm">
//           <span className="font-medium">SUP004</span>
//           <div className="flex gap-2">
//             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
//               Open
//             </span>
//             <span className="text-red-600 text-sm font-semibold">High Priority</span>
//           </div>
//         </div>
//         <p className="font-medium text-gray-800 mb-1">Payment failed but amount deducted</p>
//         <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
//           <span className="flex items-center gap-1">
//             <FaUser /> Sneha Gupta
//           </span>
//           <span>Created: 20 Jan 2024</span>
//           <span>Category: Payment Issue</span>
//         </div>
//         <p className="text-xs text-gray-400 mt-2">Last updated: 20 Jan 2024</p>
//         <div className="flex justify-end mt-2">
//           <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100">
//             View Details
//           </button>
//         </div>
//       </div>

//       </div>
//     </div>
    
//   );
// };

// export default CustomerSupport;

import React, { useEffect, useState } from "react";
import { FaClock, FaCheckCircle, FaExclamationCircle, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import adminAuthService from "../services/adminAuthService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = adminAuthService.getToken();
      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_BASE_URL}/admin/ticket`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");
 
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to load support tickets");
    } finally {
      setLoading(false);
    }
  };

const updateTicketStatus = async (ticketId, newStatus) => {
  try {
    const token = adminAuthService.getToken();
    if (!token) throw new Error("No token found");

    const res = await fetch(`${API_BASE_URL}/admin/ticket/${ticketId}/status`, {
      method: "PUT", // or PATCH
      headers: {
        "Content-Type": "application/json", // ✅ required
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }), // ✅ required
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update ticket status");

    toast.success(`Status updated to ${data.ticket.status}`);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    toast.error(error.message || "Failed to update status");
  }
};

const fetchTicketDetails = async (ticketId) => {
  try {
    const token = adminAuthService.getToken();
    const res = await fetch(`${API_BASE_URL}/admin/ticket/${ticketId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch ticket details");

    const data = await res.json();
    console.log("Ticket Details:", data);
    toast.info(`Ticket issue: ${data.issue}`);
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    toast.error("Unable to load ticket details");
  }
};


  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Customer Support</h1>
      <p className="text-gray-500 mb-6">Manage customer queries and support tickets</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Open Tickets</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter(t => t.status === "Open").length}
            </p>
          </div>
          <span className="text-blue-500 text-xl">📨</span>
        </div>
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-2xl font-bold text-gray-800">2.4h</p>
          </div>
          <FaClock className="text-yellow-500 text-xl" />
        </div>
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Resolved Today</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter(t => t.status === "Resolved").length}
            </p>
          </div>
          <FaCheckCircle className="text-green-500 text-xl" />
        </div>
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Urgent Issues</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter(t => t.priority === "High").length}
            </p>
          </div>
          <FaExclamationCircle className="text-red-500 text-xl" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 text-sm">
          New Ticket
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No support tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white border rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium">{ticket.ticketNumber || ticket._id}</span>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      ticket.priority === "High"
                        ? "text-red-600"
                        : ticket.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {ticket.priority} Priority
                  </span>
                </div>
              </div>
              <p className="font-medium text-gray-800 mb-1">{ticket.issue}</p>
              <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaUser /> {ticket.createdBy?.name || "N/A"}
                </span>
                <span>
                  Created: {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span>Category: {ticket.category || "General"}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Last updated: {new Date(ticket.updatedAt).toLocaleDateString("en-GB")}
              </p>
              <div className="flex justify-end mt-2 gap-2">
                <button
  className="border text-sm px-4 py-1 rounded hover:bg-gray-100"
  onClick={() => updateTicketStatus(ticket._id, ticket.status)}
>
  View Status
</button>

                <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100"
                onClick={() => fetchTicketDetails(ticket._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
