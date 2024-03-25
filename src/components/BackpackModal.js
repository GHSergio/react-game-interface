import { useEffect } from "react";
import ItemBlock from "./ItemBlock";
import { useGame } from "../contexts/GameContext";

function BackpackModal({ isOpen, onClose, onConfirm, title, className }) {
  const { items, activeItemIndex, setActiveItemIndex, handleAddItemClick } =
    useGame();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        e.stopPropagation();
        setActiveItemIndex(null);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onConfirm, onClose, setActiveItemIndex]);

  // 計算每行的起始index
  const getRowStartIndex = (rowIndex) => rowIndex * 8;

  return (
    <dialog
      open={isOpen}
      tabIndex="0"
      className={isOpen ? `${className}` : "hidden"}
    >
      <div className="cancel-button" onClick={onClose}>
        X
      </div>
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
                  if (index < items.length) {
                    return (
                      <ItemBlock
                        key={index}
                        index={index}
                        isActive={activeItemIndex === index}
                      />
                    );
                  } else {
                    return <div key={index}></div>;
                  }
                })}
            </div>
          ))}
      </div>
    </dialog>
  );
}

export default BackpackModal;
