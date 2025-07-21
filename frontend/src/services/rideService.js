import api from "./api";

const rideService = {
  userProfile: async () => {
    const res = await api.get("/users/me");
    return res.data;
  },

  getUserById: async (userId) => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },

  updateUser: async (userId, data) => {
    const res = await api.put(`/users/${userId}`, data);
    return res.data;
  },

  // updateProfile: async (data) => {
  //   const res = await api.patch('/users/profile', data);
  //   return res.data;
  // }

  createRide: async (rideData) => {
    const res = await api.post("/rides/create", rideData);
    return res.data;
  },

  searchRides: async ({ origin, destination, date }) => {
    const params = new URLSearchParams();
    if (origin) params.append("origin", origin);
    if (destination) params.append("destination", destination);
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate)) {
        params.append("date", parsedDate.toISOString());
      }
    }
    const res = await api.get(`/rides/search?${params.toString()}`);
    return res.data;
  },

  getRides: async () => {
    const res = await api.get("/rides");
    return res.data;
  },

  expressInterest: async (rideId) => {
    const res = await api.post(`/rides/${rideId}/interest`);
    return res.data;
  },

  acceptInterest: async (rideId, userId) => {
    const res = await api.post(`/rides/${rideId}/accept/${userId}`);
    return res.data;
  },

  startRide: async (rideId) => {
    const res = await api.put(`/rides/${rideId}/start`);
    return res.data;
  },

  cancelRide: async (rideId, reason) => {
    const res = await api.put(`/rides/${rideId}/cancel`, {
      cancellationReason: reason,
    });
    return res.data;
  },

  completeRide: async (rideId) => {
    const res = await api.put(`/rides/${rideId}/complete`);
    return res.data;
  },

  submitReview: async ({ rideId, toUserId, rating, comment }) => {
    const res = await api.post(`/rides/${rideId}/review`, {
      toUserId,
      rating,
      comment,
    });
    return res.data;
  },

  getMessages: async (rideId) => {
    const res = await api.get(`/rides/${rideId}/chat`);
    return res.data.messages;
  },

  sendMessage: async (rideId, messageData) => {
    const res = await api.post(`/rides/${rideId}/chat`, {
      content: messageData.content,
    });

    return res.data;
  },
  raiseTicket: async (rideId) => {
  const res = await api.post(`/rides/${rideId}/ticket`);
  return res.data;
},

};
export default rideService;
