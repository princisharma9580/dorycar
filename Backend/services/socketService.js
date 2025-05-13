
const socketIO = require("socket.io");

const initializeSocket = (server) => {
  const io = socketIO(server)
  

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_ride_chat", (rideId) => {
      socket.join(`ride_${rideId}`);
      console.log(`User ${socket.id} joined ride_${rideId}`);
    });

    socket.on("leave_ride_chat", (rideId) => {
      socket.leave(`ride_${rideId}`);
      console.log(`User ${socket.id} left ride_${rideId}`);
    });

    socket.on("send_message", ({ rideId, message }) => {
      io.to(`ride_${rideId}`).emit("new_message", message);
    });

    socket.on("typing", ({ username, rideId }) => {
      socket.to(`ride_${rideId}`).emit("typing", { username });
    });

    socket.on("stop_typing", ({ username, rideId }) => {
      socket.to(`ride_${rideId}`).emit("stop_typing", { username });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
