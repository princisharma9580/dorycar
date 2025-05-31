// src/admin/pages/Payouts.jsx
const Payouts = () => {
  const payouts = [
    { driver: "Amit Sharma", amount: 1250, status: "Pending", date: "2025-05-30" },
    { driver: "Priya Yadav", amount: 900, status: "Completed", date: "2025-05-28" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payouts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Driver</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{payout.driver}</td>
                <td className="p-3">₹{payout.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      payout.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
                <td className="p-3">{payout.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payouts;
