export default function Modal({ message, visible}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center animate-fade-in">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Success </h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
