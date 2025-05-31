// src/admin/pages/Dashboard.jsx
const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Rides</p>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Active Drivers</p>
          <p className="text-2xl font-bold">75</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Registered Users</p>
          <p className="text-2xl font-bold">540</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Pending Payouts</p>
          <p className="text-2xl font-bold">₹12,500</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
