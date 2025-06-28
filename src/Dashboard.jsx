import ConfirmLogOut from "./ConfirmLogOut";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// 🔁 Constants
const userInfo = {
  name: "Abbas Hamidi",
  email: "AbbashamidiCR@gmail.com",
  defaultAvatar: "./src/assets/Avatar.png",
};

const sidebarLinks = [
  { icon: "dashboard.svg", label: "Dashboard Settings" },
  { icon: "List.svg", label: "My Orders" },
  { icon: "Download.svg", label: "My Downloads" },
];

const userAccountLinks = [
  { icon: "Edit.svg", label: "Edit Account" },
  { icon: "Edit.svg", label: "Edit Address" },
  { icon: "Payment.svg", label: "Payment Methods" },
];

const quickLinks = [
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
];

// 🔧 Helpers
function readImageFile(file, onLoad) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onloadend = () => onLoad(reader.result);
  reader.readAsDataURL(file);
}

export default function Dashboard() {
  const [preview, setPreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [onConfirm, setOnConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setPreview(savedAvatar);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  useEffect(() => {
    if (onConfirm) {
      setIsLoggingOut(true);
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/");
        setIsLoggingOut(false);
        setOnConfirm(false);
        setShowLogoutModal(false);
      }, 2000);
    }
  }, [onConfirm, navigate]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    readImageFile(file, (dataUrl) => {
      setPreview(dataUrl);
      localStorage.setItem("userAvatar", dataUrl); // persist to localStorage
    });
  };

  return (
    <div className="bg-zinc-100 min-h-screen flex-col flex lg:flex-row text-black">
      {/* Toggle Sidebar Button */}
      <button
        className="lg:hidden p-2 m-4 rounded-md focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-zinc-300 p-8 space-y-10 shadow-lg transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:basis-1/3 lg:block lg:shadow-none`}
      >
        {/* Avatar & Info */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <img
              src={preview ?? userInfo.defaultAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full"
            />
            <button
              onClick={handleUploadClick}
              className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md"
              title="Upload new photo"
            >
              <span className="text-xs">📷</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{userInfo.name}</h1>
            <p className="text-sm text-zinc-500">{userInfo.email}</p>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-blue-500 hover:bg-blue-600 transition text-white py-1 px-3 rounded flex items-center gap-2 w-fit"
            >
              Log out
            </button>
          </div>
          {sidebarOpen && (
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-600 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              &times;
            </button>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="space-y-4">
          {sidebarLinks.map(({ icon, label }) => (
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
              {userAccountLinks.map(({ icon, label }) => (
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
      </aside>

      {/* Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex flex-col items-start lg:items-center justify-start basis-full lg:basis-2/3 p-4 sm:p-6 lg:p-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold border-b pb-4 sm:pb-6 mb-4">
          User Panel
        </h1>
        <p className="sm:text-lg md:text-xl mb-6 sm:mb-8">
          Hi! Welcome dear Abbas Hamidi 👋😃​​
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {quickLinks.map(({ icon, title, desc }) => (
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
      </main>

      {/* Modal */}
      <ConfirmLogOut
        isVisible={showLogoutModal}
        setVisible={setShowLogoutModal}
        message="Are you sure you want to log out?"
        setOnConfirm={setOnConfirm}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}
