export default function SupText({ children, className }) {
  return (
    <p
      className={`text-gray-500 font-normal text-sm flex items-center justify-center ${className}`}
    >
      {children}
    </p>
  );
}
