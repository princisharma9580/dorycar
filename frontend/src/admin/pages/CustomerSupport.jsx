import React, { useEffect, useState } from "react";
import { FaClock, FaCheckCircle, FaExclamationCircle, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import adminAuthService from "../services/adminAuthService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
    setSelectedTicket(data); //  Set ticket data
    setIsModalOpen(true);    //  Open modal
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Open Tickets</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter(t => t.status?.toLowerCase() === "open").length}
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
              {tickets.filter(t => t.status?.toLowerCase() === "resolved").length}
            </p>
          </div>
          <FaCheckCircle className="text-green-500 text-xl" />
        </div>
        {/* <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Urgent Issues</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter(t => t.priority === "High").length}
            </p>
          </div>
          <FaExclamationCircle className="text-red-500 text-xl" />
        </div> */}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Support Tickets</h2>
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
                  {/* <span
                    className={`text-sm font-semibold ${
                      ticket.priority === "High"
                        ? "text-red-600"
                        : ticket.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {ticket.priority} Priority
                  </span> */}
                </div>
              </div>
              <p className="font-medium text-gray-800 mb-1">{ticket.issue}</p>
              <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaUser /> {ticket.raisedBy?.name || "N/A"}
                </span>
                <span>
                  Created: {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span>Category: {ticket.category || "General"}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Last updated: {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
              </p>
              <div className="flex justify-end mt-2 gap-2">
                <button className="border text-sm px-4 py-1 rounded hover:bg-gray-100"
                onClick={() => fetchTicketDetails(ticket._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
        {selectedTicket && (
  <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 ${isModalOpen ? '' : 'hidden'}`}>
    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Ticket Details</h2>
      <ul className="text-sm text-gray-700 space-y-2">
        <li><strong>Ticket ID:</strong> {selectedTicket._id}</li>
        <li><strong>Issue:</strong> {selectedTicket.issue}</li>
        <li><strong>Status:</strong> {selectedTicket.status}</li>
        <li><strong>Created At:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</li>
        <li><strong>Raised By:</strong> {selectedTicket.raisedBy?.name || "N/A"}</li>
        <li><strong>Email:</strong> {selectedTicket.raisedBy?.email || "N/A"}</li>
        <li><strong>Phone:</strong> {selectedTicket.raisedBy?.phone || "N/A"}</li>
        <li><strong>Ride Origin:</strong> {selectedTicket.ride?.origin || "N/A"}</li>
        <li><strong>Ride Destination:</strong> {selectedTicket.ride?.destination || "N/A"}</li>
        <li><strong>Ride Date:</strong> {new Date(selectedTicket.ride?.date).toLocaleDateString()}</li>
        <li><strong>Ride Status:</strong> {selectedTicket.ride?.status || "N/A"}</li>
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

      </div>
    </div>
  );
};

export default CustomerSupport;
