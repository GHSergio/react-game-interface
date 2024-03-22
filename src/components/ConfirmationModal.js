import { useEffect } from "react";
import "../styles/style.scss";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  message2,
  confirmMessage,
  cancelMessage,
  className,
}) {
  useEffect(() => {
    //callback
    const handleKeyDown = (e) => {
      if (isOpen) {
        if (e.key === "Enter") {
          e.preventDefault();
          onConfirm();
        } else if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    //清理函數 --> 卸載eventListener 避免佔用記憶體
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; //依賴陣列
  }, [isOpen, onConfirm, onClose]);

  return (
    <dialog
      open={isOpen}
      className={isOpen ? `modal ${className}` : "hidden"}
      tabIndex="0"
    >
      <h2>{title}</h2>
      <p>{message} </p>
      <p>{message2} </p>
      <div className="modal-button-container">
        <button onClick={onConfirm}>{confirmMessage}</button>
        <button onClick={onClose}>{cancelMessage}</button>
      </div>
    </dialog>
  );
}

export default ConfirmationModal;
