export default function Button({ shape, children, onClick }) {
  const style = {
    default: "bg-blue-600 hover:bg-blue-500 text-white",
    btn1: "bg-gray-900 hover:bg-gray-800 text-white",
    btn2: "bg-green-600 hover:bg-green-500 text-white",
    backBtn: "bg-transparent text-blue-600  text-sm p-0",
    dangerBtn: "bg-red-600 hover:bg-red-500 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={` rounded-lg px-8 w-full py-4 font-bold  hover:scale-[0.98]  ${
        style[shape || "default"]
      }`}
    >
      {children}
    </button>
  );
}
