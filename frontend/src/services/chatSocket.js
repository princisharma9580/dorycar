
import socket from "./socket";

const chatSocket = {
  connect: (token) => {
    if (!socket.connected) {
      socket.auth = { token };
      socket.connect();
      console.log("Socket connected:", socket.connected);
    } else {
      console.log("Socket already connected:", socket.connected);
    }
  },

  joinRideChat: (rideId, userId) => {
    if (socket.connected) {
      socket.emit("join_ride_chat", { rideId, userId });
    }
  },

  leaveRideChat: (rideId) => {
    if (socket.connected) {
      socket.emit("leave_ride_chat", rideId);
    }
  },

  sendMessage: (rideId, message) => {
    if (socket.connected) {
      socket.emit("send_message", { rideId, message });
    }
  },

  sendTyping: (rideId, userId) => {
    if (socket.connected) {
      socket.emit("typing", { rideId, userId });
    }
  },

  setupListeners: (handleMessage, handleTyping) => {
    socket.off("new_message").on("new_message", (data) => {
      console.log("Published new_message:", data);
      handleMessage(data);
    });

    socket.off("typing").on("typing", (data) => {
      console.log("Published typing:", data);
      handleTyping(data)
    });
  },

  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },
};

export default chatSocket;
