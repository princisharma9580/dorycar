// src/admin/pages/Rides.jsx
const Rides = () => {
  const rides = [
    {
      id: "RID123",
      driver: "Amit Sharma",
      passenger: "Ravi Mehta",
      from: "Delhi",
      to: "Noida",
      fare: 220,
      status: "Completed",
    },
    {
      id: "RID124",
      driver: "Anjali Verma",
      passenger: "Neha Jain",
      from: "Gurgaon",
      to: "Faridabad",
      fare: 350,
      status: "Ongoing",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rides</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Ride ID</th>
              <th className="p-3">Driver</th>
              <th className="p-3">Passenger</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Fare</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{ride.id}</td>
                <td className="p-3">{ride.driver}</td>
                <td className="p-3">{ride.passenger}</td>
                <td className="p-3">{ride.from}</td>
                <td className="p-3">{ride.to}</td>
                <td className="p-3">₹{ride.fare}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      ride.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ride.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rides;
