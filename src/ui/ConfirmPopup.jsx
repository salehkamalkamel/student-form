import Button from "./Button";
import Container from "./Container";

export default function ConfirmPopup({ message, action, onConfirm, onCancel }) {
  function handleConfirm() {
    onConfirm(); // Call the onConfirm function from props
    onCancel();
  }

  return (
    <>
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-25 z-40"
        onClick={() => onCancel()}
      />

      {/* Centered popup */}
      <Container className="fixed inset-0 flex flex-col items-center justify-center gap-4 z-50 h-fit max-w-[600px] p-8">
        <h3 className="font-bold text-[1.2rem]">{action}</h3>
        <p className="text-center">{message}</p>
        <div className="flex gap-4 w-full">
          <Button onClick={handleConfirm} shape="dangerBtn">
            Confirm
          </Button>
          <Button shape="btn1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Container>
    </>
  );
}
