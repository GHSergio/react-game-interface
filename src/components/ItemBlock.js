import {
  ReplyPotionIcon,
  WeaponIcon,
  ArmorIcon,
  RingIcon,
  ItemIcon,
  EquippedIcon,
} from "./FontAwesomeIcons";
import { useGame } from "../contexts/GameContext";
import MenuModal from "./MenuModal";
import Tooltip from "@mui/material/Tooltip";

const ItemBlock = ({ index, isActive }) => {
  const {
    items,
    isMenuModalOpen,
    handleRightClick,
    handleCloseContextMenu,
    equipment,
  } = useGame();

  // 依傳入的 index 取得items內相應位置的item訊息
  const itemInSlot = items[index];
  // console.log("Index:", index, "Item:", itemInSlot);
  // 檢查是否裝備中
  const isEquipped = Object.values(equipment).some(
    (equip) => equip?.item?.id === itemInSlot?.id
  );

  // 根據類型選擇不同的圖示
  const renderIcon = () => {
    if (itemInSlot && itemInSlot.class === "物品") {
      if (itemInSlot.type === "藥水") {
        return <ReplyPotionIcon />;
      } else {
        return <ItemIcon />;
      }
    }
    if (itemInSlot && itemInSlot.class === "裝備") {
      if (itemInSlot.type === "武器") {
        return <WeaponIcon />;
      } else if (itemInSlot.type === "戒指" || itemInSlot.type === "護符") {
        return <RingIcon />;
      } else {
        return <ArmorIcon />;
      }
    }
    // 如果沒有匹配的類型，則不顯示圖示
    return null;
  };

  //tooltip顯示內容
  const tooltipTitle = () => {
    if (itemInSlot) {
      return (
        <div>
          <p>物品: {itemInSlot.name}</p>
          <p>類型: {itemInSlot.type}</p>
          {itemInSlot.class === "裝備" && (
            <>
              {itemInSlot.rarity && <p>品質: {itemInSlot.rarity}</p>}
              {itemInSlot.level && <p>等級: {itemInSlot.level}</p>}
              {itemInSlot.atk && <p>攻擊: {itemInSlot.atk}</p>}
              {itemInSlot.def && <p>防禦: {itemInSlot.def}</p>}
              {itemInSlot.resistance && <p>抗性: {itemInSlot.resistance}</p>}
            </>
          )}
          {itemInSlot.class === "物品" && (
            <>
              {itemInSlot.healAmount && (
                <p>效果: +{itemInSlot.healAmount}體力</p>
              )}
            </>
          )}
          <p>數量: {itemInSlot.quantity}</p>
          <p>單價: {itemInSlot.sellPrice}</p>
        </div>
      );
    }
  };

  return (
    <>
      <Tooltip
        title={tooltipTitle()}
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "lightblue",
              color: "black",
              fontSize: "0.8rem",
            },
          },
        }}
      >
        <div
          className="grid-item"
          onContextMenu={(e) => handleRightClick(e, index)}
        >
          {itemInSlot && itemInSlot.quantity >= 0 && renderIcon()}
          {itemInSlot && itemInSlot.quantity > 1 && (
            <span className="item-quantity">{"x" + itemInSlot.quantity}</span>
          )}
          {itemInSlot && itemInSlot.class === "裝備" && isEquipped && (
            <span className="item-quantity">
              <EquippedIcon />
            </span>
          )}
          {/* 格子中 存在物品 且 active 才渲染 */}
          {itemInSlot && isActive && (
            <MenuModal
              index={index}
              onClose={() => handleCloseContextMenu?.()}
              isOpen={isMenuModalOpen}
            />
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default ItemBlock;
