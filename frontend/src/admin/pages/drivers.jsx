// src/admin/pages/Drivers.jsx
const Drivers = () => {
  const drivers = [
    {
      name: "Amit Sharma",
      phone: "9876543210",
      vehicle: "Honda City",
      rating: 4.8,
      status: "Active",
    },
    {
      name: "Priya Yadav",
      phone: "9123456780",
      vehicle: "Suzuki Ertiga",
      rating: 4.6,
      status: "Suspended",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Drivers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{driver.name}</td>
                <td className="p-3">{driver.phone}</td>
                <td className="p-3">{driver.vehicle}</td>
                <td className="p-3">{driver.rating}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      driver.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {driver.status}
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

export default Drivers;
