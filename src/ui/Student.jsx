import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useSignout } from "../hooks/useSignout";
import { useRef, useState } from "react";
import ConfirmPopup from "./ConfirmPopup";

export default function Student({ name, id }) {
  const { signOut, isSigningOut } = useSignout();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const refElement = useRef();

  // Handle click to navigate to student details
  function handleClick(event) {
    if (event.target !== refElement.current && !isSigningOut) {
      navigate(`/student/${id}`);
    }
  }

  // Function to confirm sign-out action
  function handleDelete() {
    signOut(id); // Call signOut only after confirmation
    setShowConfirm(false); // Close the popup after confirming
  }

  return (
    <>
      {showConfirm && (
        <ConfirmPopup
          action="signout"
          message="Are you sure you want to sign out? All of your data will be deleted."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div
        onClick={handleClick}
        disabled={isSigningOut}
        className="flex items-center w-full px-4 py-2 text-gray-700 font-bold text-[1rem] bg-gray-200 rounded-lg justify-between cursor-pointer"
      >
        <p>{name || "No Name Added"}</p>
        <button
          ref={refElement}
          disabled={isSigningOut}
          onClick={() => setShowConfirm(true)} // Open the popup on click
          className="flex items-center justify-center font-bold text-white rounded-full bg-red-600 w-8 h-8"
        >
          {isSigningOut ? <Spinner /> : "X"}
        </button>
      </div>
    </>
  );
}
