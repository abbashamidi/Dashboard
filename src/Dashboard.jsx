import ConfirmLogOut from "./ConfirmLogOut";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const confirmLogOutMessage = "Are you sure you want to log out ?";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (onConfirm) {
      localStorage.removeItem("token");
      setShowModal(false);
      navigate("/");
      setOnConfirm(false);
    }
  }, [onConfirm, navigate]);

  return (
    <div className="bg-zinc-100 min-h-screen flex-col flex lg:flex-row text-black">
      <button
        className="lg:hidden p-2 m-4 rounded-md focus:outline-none"
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full bg-white border-r border-zinc-300 p-8 space-y-10 shadow-lg
    transform transition-transform duration-300 ease-in-out z-50
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:basis-1/3 lg:block lg:shadow-none
  `}
      >
        <div className="flex items-center gap-4">
          <img
            src="./src/assets/Avatar.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">Abbas Hamidi</h1>
            <p className="text-sm text-zinc-500">AbbashamidiCR@gmail.com</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 transition text-white py-1 px-3 rounded flex items-center gap-2 w-fit"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: "dashboard.svg", label: "Dashboard Settings" },
            { icon: "List.svg", label: "My Orders" },
            { icon: "Download.svg", label: "My Downloads" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:bg-zinc-100 transition cursor-pointer border"
            >
              <img
                src={`./src/assets/${icon}`}
                alt={label}
                className="w-5 h-5"
              />
              <span>{label}</span>
            </div>
          ))}

          <div className="bg-white border rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2">
              <img src="./src/assets/User.svg" alt="User" className="w-5 h-5" />
              <span>User Account</span>
            </div>

            <div className="pl-7 space-y-2 text-sm">
              {[
                { icon: "Edit.svg", label: "Edit Account" },
                { icon: "Edit.svg", label: "Edit Address" },
                { icon: "Payment.svg", label: "Payment Methods" },
              ].map(({ icon, label }) => (
                <p
                  key={label}
                  className="flex items-center gap-2 hover:text-zinc-600 cursor-pointer"
                >
                  <img
                    src={`./src/assets/${icon}`}
                    className="w-4 h-4"
                    alt={label}
                  />
                  {label}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:bg-zinc-100 transition cursor-pointer border">
            <img src="./src/assets/Heart.svg" className="w-5 h-5" />
            <span>My Favorites List</span>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Panel */}
      <div className="flex flex-col items-start lg:items-center justify-start basis-full lg:basis-2/3 p-4 sm:p-6 lg:p-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold border-b pb-4 sm:pb-6 mb-4">
          User Panel
        </h1>
        <p className="sm:text-lg md:text-xl mb-6 sm:mb-8">
          Hi! Welcome dear Abbas Hamidi 👋😃​​
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {[
            {
              icon: "DownloadBox.svg",
              title: "Downloads",
              desc: "You can see your downloads here",
            },
            {
              icon: "ListBox.svg",
              title: "Online Orders",
              desc: "Here are your online orders",
            },
            {
              icon: "FavoriteBox.svg",
              title: "Favorites",
              desc: "Visit your favorite stuff in here",
            },
            {
              icon: "UserInfoBox.svg",
              title: "Account Info",
              desc: "Check out your account information",
            },
            {
              icon: "TransportAddressBox.svg",
              title: "Transport Options",
              desc: "Choose your way of transportation",
            },
            {
              icon: "PaymentMethodsBox.svg",
              title: "Payment Methods",
              desc: "Check out your payment methods",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-zinc-200 rounded-xl p-4 sm:p-5 flex flex-col items-center text-center gap-2 hover:shadow-md hover:scale-105 transition-transform w-full"
            >
              <img
                src={`./src/assets/${icon}`}
                className="w-10 h-10"
                alt={title}
              />
              <p className="font-semibold text-base">{title}</p>
              <p className="text-sm text-zinc-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <ConfirmLogOut
        isVisible={showModal}
        setVisible={setShowModal}
        message={confirmLogOutMessage}
        setOnConfirm={setOnConfirm}
      />
    </div>
  );
}
