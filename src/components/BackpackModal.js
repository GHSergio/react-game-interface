import { useEffect, useState } from "react";
import ItemBlock from "./ItemBlock";
import { useGame } from "../contexts/GameContext";

function BackpackModal({ isOpen, onClose, onConfirm, title, className }) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  const { addItem, items } = useGame();

  // console.log(items);
  useEffect(() => {
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

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onConfirm, onClose]);

  // 計算每行的起始index
  const getRowStartIndex = (rowIndex) => rowIndex * 8;

  const handleAddItemClick = () => {
    addItem();
  };

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setIsMenuModalOpen(true);
    setActiveItemIndex(index);
  };

  const handleCloseContextMenu = () => {
    setIsMenuModalOpen(false);
  };

  return (
    <dialog
      open={isOpen}
      tabIndex="0"
      className={isOpen ? `${className}` : "hidden"}
    >
      <h2>{title}</h2> <button onClick={handleAddItemClick}>添加物品</button>
      <div className="grid-container">
        <hr />
        {/* 根據items Array長度 來生成 */}
        {Array(Math.ceil(items.length / 8))
          .fill()
          .map((_, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {/* 每行生成 8 列 */}
              {Array(8)
                .fill()
                .map((_, colIndex) => {
                  const index = getRowStartIndex(rowIndex) + colIndex;
                  return (
                    <ItemBlock
                      key={index}
                      index={index}
                      isActive={activeItemIndex === index}
                      onContextMenu={(e) => handleRightClick?.(e, index)}
                      onCloseContextMenu={() => handleCloseContextMenu?.()}
                      isMenuModalOpen={isMenuModalOpen}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </dialog>
  );
}

export default BackpackModal;
