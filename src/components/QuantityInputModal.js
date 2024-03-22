import React, { useEffect } from "react";

const QuantityInputModal = ({
  isOpen,
  onClose,
  onConfirm,
  value,
  onChange,
  message,
  confirmMessage,
  cancelMessage,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Enter") {
        onConfirm();
      }
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onConfirm, onClose]);

  return (
    <dialog
      className={`modal menu-action-input ${isOpen ? "" : "hidden"} `}
      tabIndex="0"
    >
      <h2>{message}</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="1"
      />
      <div className="modal-button-container">
        <button onClick={() => onConfirm(value)}>{confirmMessage}</button>
        <button onClick={onClose}>{cancelMessage}</button>
      </div>
    </dialog>
  );
};

export default QuantityInputModal;
