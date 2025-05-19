import { useState } from "react";
import { login } from "./Services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verification = async () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email should not be empty";
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      newErrors.email = "Email format is not valid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }

    setError(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        setLoading(true);
        const result = await login(email, password);
        localStorage.setItem("token", result.token);
        navigate("/Dashboard");
      } catch (err) {
        setError((prev) => ({
          ...prev,
          password: "Invalid Email or Password",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-2xl font-semibold text-center text-black mb-6">
          User Login
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              autoComplete="email"
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {error.password && (
              <p className="text-sm text-red-500">{error.password}</p>
            )}
          </div>

          <button
            onClick={verification}
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
