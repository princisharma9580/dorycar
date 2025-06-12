const TOKEN_KEY = "admin-token";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const login = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log("Login response:", data);

  if (!res.ok) throw new Error(data.message || "Login failed");

  const { token } = data;
  localStorage.setItem(TOKEN_KEY, token);
};

const logout = () => localStorage.removeItem(TOKEN_KEY);

const getToken = () => localStorage.getItem(TOKEN_KEY);

const isAuthenticated = () => !!getToken();

export default { login, logout, getToken, isAuthenticated };
