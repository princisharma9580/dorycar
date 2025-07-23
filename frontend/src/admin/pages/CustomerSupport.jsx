import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import adminAuthService from "../services/adminAuthService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CustomerSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

      const res = await fetch(
        `${API_BASE_URL}/admin/ticket/${ticketId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      toast.success(`Status updated to ${data.ticket.status}`);

      // Update in modal UI
      setSelectedTicket((prev) => ({
        ...prev,
        status: data.ticket.status,
      }));

      fetchTickets();
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error(error.message || "Status update error");
    }
  };

  const fetchTicketDetails = async (ticketId) => {
    try {
      const token = adminAuthService.getToken();
      const res = await fetch(
        `${API_BASE_URL}/admin/ticket/${ticketId}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch ticket details");

      const data = await res.json();
      setSelectedTicket(data); //  Set ticket data
      setIsModalOpen(true); //  Open modal
      console.log("Ticket Details:", data);
      toast.info(`Ticket issue: ${data.issue}`);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      toast.error("Unable to load ticket details");
    }
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Conditional available statuses
  const getAvailableStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "open":
        return ["open", "pending", "in-progress", "resolved", "closed"];
      case "pending":
        return ["pending", "in-progress", "resolved"];
      case "in-progress":
        return ["in-progress", "resolved"];
      case "resolved":
        return ["resolved", "closed"];
      case "closed":
        return ["closed"]; // Cannot change once closed
      default:
        return ["open", "pending", "in-progress", "resolved", "closed"];
    }
  };

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case "open":
        return "text-blue-600";
      case "in-progress":
        return "text-yellow-600";
      case "resolved":
        return "text-green-600";
      case "pending":
        return "text-purple-600";
      case "rejected":
      case "closed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadgeColor = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-purple-100 text-purple-700";
      case "closed":
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (status) => {
    setNextStatus(status);
    setIsConfirmModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedTicket || !nextStatus) return;

    try {
      const token = adminAuthService.getToken();
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${API_BASE_URL}/admin/ticket/${selectedTicket._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");

      // Update modal state
      setSelectedTicket((prev) => ({
        ...prev,
        status: data.ticket.status,
      }));

      // Update main ticket list
      fetchTickets();
      toast.success(`Status updated to ${data.ticket.status}`);
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error(error.message || "Status update error");
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Customer Support
      </h1>
      <p className="text-gray-500 mb-6">
        Manage customer queries and support tickets
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Open Tickets</p>
            <p className="text-2xl font-bold text-gray-800">
              {tickets.filter((t) => t.status?.toLowerCase() === "open").length}
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
              {
                tickets.filter((t) => t.status?.toLowerCase() === "resolved")
                  .length
              }
            </p>
          </div>
          <FaCheckCircle className="text-green-500 text-xl" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Support Tickets
        </h2>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p>No support tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white border rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-medium">
                  {ticket.ticketNumber || ticket._id}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadgeColor(
                    ticket.status
                  )}`}
                >
                  {capitalize(ticket.status)}
                </span>
              </div>
              <p className="font-medium text-gray-800 mb-1">{ticket.issue}</p>
              <div className="text-sm text-gray-500 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaUser /> {ticket.raisedBy?.name || "N/A"}
                </span>
                <span>
                  Created:{" "}
                  {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                </span>
                <span>Category: {ticket.category || "General"}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Last updated:{" "}
                {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
              </p>
              <div className="flex justify-end mt-2 gap-2">
                <button
                  className="border text-sm px-4 py-1 rounded hover:bg-gray-100"
                  onClick={() => fetchTicketDetails(ticket._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
        {selectedTicket && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
              isModalOpen ? "" : "hidden"
            }`}
          >
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl transform transition-all scale-100">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-2">
                🎫 Ticket Details
              </h2>
              <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <p>
                  <strong>🆔 Ticket ID:</strong> {selectedTicket._id}
                </p>
                <p>
                  <strong>📄 Issue:</strong> {selectedTicket.issue}
                </p>
                {selectedTicket.image ? (
                  <p>
                    <strong>🖼️ Uploaded Image:</strong>{" "}
                    <span
                      onClick={() => setIsImageModalOpen(true)}
                      className="text-blue-600 underline cursor-pointer hover:text-blue-800"
                    >
                      Click to view image
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-500 italic"> No picture uploaded for this ticket.</p>
                )}

                <div>
                  <strong>📌 Status:</strong>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${getStatusColor(
                      selectedTicket.status
                    )} focus:ring-blue-400 focus:border-blue-400`}
                  >
                    {getAvailableStatusOptions(selectedTicket.status).map(
                      (status) => (
                        <option key={status} value={status}>
                          {capitalize(status)}
                        </option>
                      )
                    )}
                  </select>
                  
                </div>

                <p>
                  <strong>📅 Created At:</strong>{" "}
                  {new Date(selectedTicket.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>🙋‍♂️ Raised By:</strong>{" "}
                  {selectedTicket.raisedBy?.name || "N/A"}
                </p>
                <p>
                  <strong>📧 Email:</strong>{" "}
                  {selectedTicket.raisedBy?.email || "N/A"}
                </p>
                <p>
                  <strong>📞 Phone:</strong>{" "}
                  {selectedTicket.raisedBy?.phone || "N/A"}
                </p>
                <p>
                  <strong>📍 Origin:</strong>{" "}
                  {selectedTicket.ride?.origin || "N/A"}
                </p>
                <p>
                  <strong>🎯 Destination:</strong>{" "}
                  {selectedTicket.ride?.destination || "N/A"}
                </p>
                <p>
                  <strong>🗓️ Ride Date:</strong>{" "}
                  {new Date(selectedTicket.ride?.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>🚗 Ride Status:</strong>{" "}
                  {selectedTicket.ride?.status || "N/A"}
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  className="px-5 py-2 text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✖ Close
                </button>
              </div>
            </div>
          </div>
        )}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Status Change
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to change the status to{" "}
                <span className="font-bold">{nextStatus}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => setIsConfirmModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={confirmStatusChange}
                >
                  Yes, Update
                </button>
              </div>
            </div>
          </div>
        )}
        {isImageModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="bg-white p-4 rounded-xl max-w-2xl w-full shadow-2xl relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                onClick={() => setIsImageModalOpen(false)}
              >
                ✖
              </button>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Uploaded Image</h3>
              <img
                src={selectedTicket.image}
                alt="Ticket Upload"
                className="max-h-[500px] w-auto mx-auto rounded border"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerSupport;
