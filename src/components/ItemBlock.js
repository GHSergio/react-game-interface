import React from "react";
import { useGame } from "../contexts/GameContext";
import { ReplyPotionIcon } from "./FontAwesomeIcons";
import MenuModal from "./MenuModal";

const ItemBlock = ({
  index,
  isActive,
  onContextMenu,
  onCloseContextMenu,
  isMenuModalOpen,
}) => {
  const { items } = useGame();

  // 依傳入的 index 取得items內相應位置的item訊息
  const itemInSlot = items[index];

  // console.log("Index:", index, "Item:", itemInSlot);

  return (
    <div className="grid-item" onContextMenu={(e) => onContextMenu(e, index)}>
      {itemInSlot && itemInSlot.quantity > 0 && itemInSlot.type === "藥水" && (
        <ReplyPotionIcon />
      )}
      {itemInSlot && itemInSlot.quantity > 1 && (
        <span className="item-quantity">{"x" + itemInSlot.quantity}</span>
      )}
      {/* 只有在格子中存在物品时才渲染 MenuModal 组件 */}
      {itemInSlot && isActive && (
        <MenuModal
          index={index}
          onClose={() => onCloseContextMenu?.()}
          isOpen={isMenuModalOpen}
        />
      )}
    </div>
  );
};

export default ItemBlock;
