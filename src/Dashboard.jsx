import ConfirmLogOut from "./ConfirmLogOut";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const confirmLogOutMessage = "Are you sure you want to log out ?";
  const [onConfirm, setOnConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onConfirm) {
      localStorage.removeItem("token");
      setShowModal(false);
      navigate("/");
      setOnConfirm(false); // Reset after use
    }
  }, [onConfirm, navigate]);

  return (
    <div className="bg-zinc-100 min-h-screen flex text-black">
      {/* Sidebar */}
      <div className="basis-1/3 space-y-10 p-8 border-r border-zinc-300 hidden lg:block">
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

      {/* Main Panel */}
      <div className="flex flex-col lg:items-center lg:justify-start basis-2/3 p-8">
        <h1 className="text-3xl font-bold border-b pb-6 mb-4">User Panel</h1>
        <p className="text-xl mb-8">Hi! Welcome dear Abbas Hamidi 👋😃​​</p>

        <div className="grid grid-cols-3 gap-4">
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
              className="bg-zinc-200 rounded-xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-md hover:scale-105 transition-transform min-w-[190px]"
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
