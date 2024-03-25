import React from "react";
import { ReplyPotionIcon, WeaponIcon } from "./FontAwesomeIcons";
import { useGame } from "../contexts/GameContext";
import MenuModal from "./MenuModal";

const ItemBlock = ({ index, isActive }) => {
  const { items, isMenuModalOpen, handleRightClick, handleCloseContextMenu } =
    useGame();

  // 依傳入的 index 取得items內相應位置的item訊息
  const itemInSlot = items[index];

  // console.log("Index:", index, "Item:", itemInSlot);

  // 根據類型選擇不同的圖示
  const renderIcon = () => {
    if (itemInSlot && itemInSlot.type === "藥水") {
      return <ReplyPotionIcon />;
    } else if (itemInSlot && itemInSlot.type === "武器") {
      return <WeaponIcon />;
    } else if (itemInSlot && itemInSlot.type === "盔甲") {
      return <WeaponIcon />;
    } else if (itemInSlot && itemInSlot.type === "腿甲") {
      return <WeaponIcon />;
    }
    // 如果沒有匹配的類型，則不顯示圖示
    return null;
  };

  return (
    <div
      className="grid-item"
      onContextMenu={(e) => handleRightClick(e, index)}
    >
      {itemInSlot && itemInSlot.quantity >= 0 && renderIcon()}
      {itemInSlot && itemInSlot.quantity > 1 && (
        <span className="item-quantity">{"x" + itemInSlot.quantity}</span>
      )}
      {/* 只有在格子中存在物品时才渲染 MenuModal 组件 */}
      {itemInSlot && isActive && (
        <MenuModal
          index={index}
          onClose={() => handleCloseContextMenu?.()}
          isOpen={isMenuModalOpen}
        />
      )}
    </div>
  );
};

export default ItemBlock;
