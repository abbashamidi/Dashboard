export default function ConfirmLogOut({ isVisible, message,setVisible,setOnConfirm }) {

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg border border-gray-200 text-center animate-fade-in">
        <p className="font-semibold">{message}</p>
        <div>
            <button onClick={()=> setOnConfirm(true)} className="inline-block mx-4 mt-4 bg-blue-500 rounded py-1 px-2 text-white w-1/5">Yes</button>
            <button onClick={() => setVisible(false)} className="inline-block mx-4 mt-4 bg-red-500 rounded py-1 px-2 text-white w-1/5">Cancel</button>
        </div>
      </div>
    </div>
  );
}
