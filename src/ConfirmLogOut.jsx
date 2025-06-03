export default function ConfirmLogOut({
  isVisible,
  message,
  setVisible,
  setOnConfirm,
  isLoggingOut,
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center animate-fade-in">
        <p className="font-semibold">{message}</p>
        <div>
          <button
            onClick={() => setOnConfirm(true)}
            className="inline-block mx-4 mt-4 bg-blue-500 rounded py-1 px-2 text-white w-1/5"
          >
            Yes
          </button>
          <button
            onClick={() => setVisible(false)}
            className="inline-block mx-4 mt-4 bg-red-500 rounded py-1 px-2 text-white w-1/5"
          >
            Cancel
          </button>
        </div>
      </div>
      {isLoggingOut && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="w-64 h-32 bg-white rounded-xl shadow-lg border border-zinc-200 flex flex-col items-center justify-center gap-4 animate-fade-in">
      <svg
        className="w-6 h-6 text-blue-500 animate-spin"
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
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-gray-700 font-medium text-base">Logging out...</span>
    </div>
  </div>
)}

    </div>
  );
}
