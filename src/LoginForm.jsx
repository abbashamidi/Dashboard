import { useState } from "react";
import { login } from "./Services/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const verification = async () => {
    const newErrors = { email: "", password: "" };
    if (!email) {
      newErrors.email = "Email should not be empty";
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
      newErrors.email = "Email format is not valid";
    }

    if (!password) {
      newErrors.password = "Password required";
    } else if (password.length < 6) {
      newErrors.password = "Password should be more than 6 characters";
    }

    setError(newErrors);

    if (!newErrors.email && !newErrors.password) {
      try {
        setLoading(true);
        const result = await login(email, password);
        console.log("Login Success", result);
        alert("Logged in Successfully");
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
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-700 w-1/3 h-96 mt-12 rounded-lg border py-2 px-10">
        <h1 className="text-center h-14">User Login</h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-start gap-2">
            <span>Enter your Email:</span>
            <input
              type="text"
              className="rounded focus:outline-none py-0.5 px-1 w-3/4 text-black"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example:AbbashamidiCR@gmail.com"
              autoComplete="email"
            />
            <p className="text-red-500">{error.email}</p>
          </div>
          <div className="flex flex-col justify-start gap-2">
            <span>Enter your Password:</span>
            <input
              type="password"
              className="rounded focus:outline-none py-0.5 px-1 w-3/4 text-black"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
            />
            <p className="text-red-500">{error.password}</p>
          </div>

          <button
            onClick={() => verification()}
            disabled={loading}
            className="rounded bg-blue-500 px-1 py-0.5 w-24 disabled:opacity-50"
          >
            {loading ? "loading" : "submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
