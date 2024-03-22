import React, { useEffect } from "react";
import { useGame } from "../contexts/GameContext";

const QuantityInputModal = ({
  isOpen,
  itemIndex,
  onClose,
  onConfirm,
  message,
  confirmMessage,
  cancelMessage,
}) => {
  const { items, quantityInputValue, setQuantityInputValue } = useGame();
  const currentItem = items[itemIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        e.stopPropagation(); // 防止事件冒泡到父級元素
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onConfirm, onClose, quantityInputValue]);

  // console.log(currentItem.quantity);

  //讓每次ModalOpen都是預設為1
  useEffect(() => {
    setQuantityInputValue(1);
  }, [isOpen, setQuantityInputValue]);

  return (
    <dialog
      className={`modal menu-action-input ${isOpen ? "" : "hidden"} `}
      tabIndex="0"
    >
      <h2>{message}</h2>
      <input
        type="number"
        onChange={(e) => setQuantityInputValue(parseInt(e.target.value))}
        value={quantityInputValue}
        min="1"
        // max={currentItem ? currentItem.quantity : ""}
        max={currentItem ? String(currentItem.quantity) : ""}
        // max={currentItem ? currentItem.quantity : Number.MAX_SAFE_INTEGER}
      />
      <div className="modal-button-container">
        <button onClick={() => onConfirm(quantityInputValue)}>
          {confirmMessage}
        </button>
        <button onClick={onClose}>{cancelMessage}</button>
      </div>
    </dialog>
  );
};

export default QuantityInputModal;
