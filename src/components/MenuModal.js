import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import QuantityInputModal from "./QuantityInputModal";

const MenuModal = ({ index, isOpen, onClose }) => {
  const [currentAction, setCurrentAction] = useState(null);
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
  }, [isOpen, onClose]);

  const {
    items,
    usedItem,
    sellItem,
    isQuantityInputModalOpen,
    setIsQuantityInputModalOpen,
    setIsMenuModalOpen,
    activeItemIndex,
  } = useGame();

  // console.log(items[index]);
  const item = items[activeItemIndex];

  const handleItemClick = (action) => {
    if (!item && item.quantity === 0) return; // 确保物品存在
    if (action === "use") {
      setCurrentAction("use");
      setIsQuantityInputModalOpen(true);
    } else if (action === "sell") {
      setCurrentAction("sell");
      setIsQuantityInputModalOpen(true);
    } else if (action === "cancel") {
      setIsQuantityInputModalOpen(false);
      setIsMenuModalOpen(false);
    }
    setIsMenuModalOpen(false);
  };

  const handleQuantityInputConfirm = (quantity) => {
    setIsQuantityInputModalOpen(false);
    setIsMenuModalOpen(false);
    if (currentAction === "use") {
      const item = items[activeItemIndex];
      if (item && item.quantity > 0) {
        usedItem(item, quantity);
      }
    } else if (currentAction === "sell") {
      const item = items[activeItemIndex];
      if (item && quantity > 0) {
        sellItem(item, quantity);
      }
    }
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
        isOpen={isQuantityInputModalOpen}
        itemIndex={index}
        message="請輸入數量"
        confirmMessage="確認"
        cancelMessage="取消"
        onClose={() => setIsQuantityInputModalOpen(false)}
        onConfirm={handleQuantityInputConfirm}
      />
    </>
  );
};

export default MenuModal;
