import React, { useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import QuantityInputModal from "./QuantityInputModal";
const MenuModal = ({ index, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const {
    items,
    usedItem,
    sellItem,
    quantityInputValue,
    setQuantityInputValue,
    isQuantityInputModalOpen,
    setIsQuantityInputModalOpen,
  } = useGame();

  console.log(items[index]);
  const item = items[index];

  const handleItemClick = (action) => {
    if (!item) return; // 确保物品存在
    if (action === "use" && item.quantity > 0) {
      setIsQuantityInputModalOpen(true);
    } else if (action === "sell" && item.quantity > 0) {
      setIsQuantityInputModalOpen(true);
    } else if (action === "cancel") {
      setIsQuantityInputModalOpen(false);
      onClose();
    }
    onClose();
  };

  return (
    <>
      <dialog className={`menu-list ${isOpen ? "" : "hidden"} `} tabIndex="0">
        <div className="modal-button-container">
          <button onClick={() => handleItemClick("use")}>使用</button>
          <button onClick={() => handleItemClick("sell")}>出售</button>
          <button onClick={() => handleItemClick("cancel")}>取消</button>
        </div>
      </dialog>

      <QuantityInputModal
        message="請輸入數量"
        isOpen={isQuantityInputModalOpen}
        confirmMessage="確認"
        cancelMessage="取消"
        value={quantityInputValue}
        onChange={(value) => setQuantityInputValue(value)}
        onClose={() => setIsQuantityInputModalOpen(false)}
        onConfirm={(action) => {
          if (item && quantityInputValue > 0) {
            if (action === "use" && item.quantity > 0) {
              usedItem(item.id, quantityInputValue);
            } else if (action === "sell" && item.quantity > 0) {
              sellItem(item, quantityInputValue);
            }
            setIsQuantityInputModalOpen(false);
            onClose();
          }
        }}
      />
    </>
  );
};

export default MenuModal;
