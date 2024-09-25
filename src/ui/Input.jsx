import React from "react";

const Input = React.forwardRef(
  ({ heading, holder, error, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-center items-start gap-2">
        <p className="text-sm font-semibold text-gray-600">{heading}</p>
        <input
          placeholder={holder || ""}
          ref={ref}
          {...props}
          disabled={disabled}
          className={`font-medium px-4 py-2 text-[1rem] outline-0 border-2 ${
            error ? "border-red-400" : "border-gray-400"
          } rounded-lg`}
        />
        {error && <p className="text-sm font-medium text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
