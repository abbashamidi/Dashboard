import { useState, useEffect } from "react";
import { login } from "./Services/authService";
import { useNavigate } from "react-router-dom";
import Modal from "./SuccessLogInModal";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "Logged in successfully! ✅"
  );
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      const timer1 = setTimeout(
        () => setModalMessage("Transporting to dashboard..."),
        1500
      );
      const timer2 = setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const verification = async () => {
    const errors = { email: "", password: "" };
    const { email, password } = formData;

    if (!email) errors.email = "Email should not be empty";
    else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email))
      errors.email = "Email format is not valid";

    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password should be at least 6 characters";

    setFormError(errors);
    setLoginError("");

    if (!errors.email && !errors.password) {
      try {
        setLoading(true);
        const result = await login(email, password);
        localStorage.setItem("token", result.token);
        setShowModal(true);
      } catch (err) {
        setLoginError("Invalid email or password.");
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

        {loginError && (
          <p className="text-red-500 text-center mb-4">{loginError}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            verification();
          }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <label
              className="text-sm text-gray-700 font-semibold"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              autoComplete="email"
              aria-describedby="email-error"
            />
            {formError.email && (
              <p id="email-error" className="text-sm text-red-500">
                {formError.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm text-gray-700 font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-describedby="password-error"
            />
            {formError.password && (
              <p id="password-error" className="text-sm text-red-500">
                {formError.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || showModal}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <Modal visible={showModal} message={modalMessage} />
    </div>
  );
}
