
// Topbar.jsx (simplified)
const Topbar = ({ onToggleSidebar, isSidebarOpen }) => (
  <div className="flex items-center bg-white p-4 shadow">
    <button
      className="mr-4 focus:outline-none"
      onClick={onToggleSidebar}
      aria-label="Toggle sidebar"
    >
      {/* Hamburger icon */}
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isSidebarOpen ? (
          // X icon to close
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Hamburger icon to open
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>

    {/* <h1 className="text-xl font-semibold">Admin Panel</h1> */}
    <img
              alt="Dorycar Logo"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
              style={{ height: "40px", marginRight: "8px" }}
            />
  </div>
);

export default Topbar;
