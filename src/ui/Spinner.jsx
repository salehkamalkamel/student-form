export default function Spinner() {
  return (
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
