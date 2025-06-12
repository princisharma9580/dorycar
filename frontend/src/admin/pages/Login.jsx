
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import adminAuthService from "../services/adminAuthService";
// import bgImage from '../../../public/img.png';


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await adminAuthService.login(email, password);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="absolute inset-0 bg-green-900 bg-opacity-60 backdrop-blur-sm z-0" />

//       <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 animate-fade-in">
//         <div className="flex justify-center mb-6 animate-fade-in-slow">
//           <img
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
//             alt="Dorycar Logo"
//             className="h-14 w-auto rounded-full border border-white shadow"
//           />
//         </div>

//         <h2 className="text-3xl font-bold text-center text-white mb-4">Admin Login</h2>

//         {error && (
//           <div className="bg-red-200 text-red-800 border border-red-400 p-2 rounded text-sm mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 rounded-md bg-white/90 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 rounded-md bg-white/90 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 shadow"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-white/70">
//           &copy; {new Date().getFullYear()} Dorycar Admin Panel
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAuthService from "../services/adminAuthService";
import bgImage from '../../../public/img.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await adminAuthService.login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
      setIsSubmitting(false);
    }
  };

return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-green-900 bg-opacity-60 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 animate-fade-in">
        <div className="flex justify-center mb-6 animate-fade-in-slow">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
            alt="Dorycar Logo"
            className="h-14 w-auto rounded-full border border-white shadow"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-4">Admin Login</h2>

        {error && (
          <div className="bg-red-200 text-red-800 border border-red-400 p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-white/90 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-12 rounded-md bg-white/90 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-green-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-green-200 hover:text-white transition duration-150"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 shadow flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : null}
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} Dorycar Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
