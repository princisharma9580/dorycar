
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  readBy: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }]
});

const ridePreferenceSchema = new Schema({
  music: { type: Boolean, default: false },
  ac: { type: Boolean, default: false},
  luggage: {type: Boolean, default: false},
  // womenOnly: {type: Boolean, default: false},
  smoking: {type: Boolean, default: false},
  bagMax: {type: Boolean, default: false},
  pet:{type: Boolean, default: false}

}, { _id: false });

const rideSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  departureTime: {
  type: Date, // or Date if you want time with full date
  required: true
},
arrivalTime: {
  type: Date,
  required: true
},
  seats: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['waiting', 'pending', 'accepted', 'started' ,'completed', 'cancelled'],
    default: 'pending'
  },

  interestedUsers: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['waiting', 'interested', 'accepted', 'rejected', 'started' ,'completed', 'cancelled'],
      default: 'interested'
    },

    timestamp: {
      type: Date,
      default: Date.now
    },


  }],
  acceptor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },

  // Optional additional fields
  vehicleDetails: {
    type: String
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String
  },
  paymentMethods: [String],
upiId: { type: String },
qrImageUrl: { type: String },

  preferredCommunication: {
    type: String,
    enum: ['Chat', 'Call', 'Both'],
    default: undefined
  },
  ridePreference: {
    type: ridePreferenceSchema,
    default: () => ({})
  },

  notifications: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now }
  }
],


  verified: {
    id: Boolean,
    phone: Boolean,
    license: Boolean,
    emergencyContact: Boolean
  },

  fareSplitShown: {
    type: Boolean,
    default: false
  }
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
