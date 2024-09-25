export default function Container({ children, className }) {
  return (
    <div
      className={`bg-white mt-12 rounded-[1rem] p-8 ${className} drop-shadow-lg w-max mx-auto`}
    >
      {children}
    </div>
  );
}
