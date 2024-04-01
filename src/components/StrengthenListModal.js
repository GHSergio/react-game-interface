import { useState } from "react";
import { useGame } from "../contexts/GameContext";

const StrengthenListModal = ({
  onEquipmentPartClick,
  isOpen,
  onClose,
  className,
}) => {
  const [activeButton, setActiveButton] = useState(null);
  const { equipment } = useGame();

  //接收部位,設置ActiveButton & onEquipmentPartClick 為該部位
  const handleButtonClick = (equipmentPart) => {
    setActiveButton(equipmentPart);
    onEquipmentPartClick(equipmentPart);
  };

  return (
    <>
      <div className={isOpen ? "overlay" : ""}></div>

      <dialog open={isOpen} className={isOpen && `${className}`} tabIndex="0">
        <button onClick={onClose}>取消強化</button>
        {Object.entries(equipment).map(([part, { item, strengthenLevel }]) => (
          <button
            key={part}
            className={activeButton === part ? "active-button" : ""}
            onClick={() => handleButtonClick(part)}
          >
            <>
              <span>
                {part === "arms"
                  ? `Lv.${strengthenLevel} 武器`
                  : part === "helmet"
                  ? `Lv.${strengthenLevel} 頭盔`
                  : part === "armor"
                  ? `Lv.${strengthenLevel} 鎧甲`
                  : part === "legArmor"
                  ? `Lv.${strengthenLevel} 護腿`
                  : part === "gloves"
                  ? `Lv.${strengthenLevel} 護手`
                  : part === "boots"
                  ? `Lv.${strengthenLevel} 靴子`
                  : part === "amulet"
                  ? `Lv.${strengthenLevel} 護符`
                  : part === "ring"
                  ? `Lv.${strengthenLevel} 戒指`
                  : ""}
              </span>
              {item ? <span>{item.name}</span> : <span> 部位尚未裝備 </span>}
              {item && item.atk && <span>攻擊: {item.atk}</span>}
              {item && item.def && <span>防禦: {item.def}</span>}
              {item && item.resistance && <span>抗性: {item.resistance}</span>}
            </>
          </button>
        ))}
      </dialog>
    </>
  );
};

export default StrengthenListModal;
