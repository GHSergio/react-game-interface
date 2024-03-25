import { useState } from "react";
import { useGame } from "../contexts/GameContext";

const StrengthenListModal = ({
  onEquipmentPartClick,
  isOpen,
  onClose,
  className,
}) => {
  const { equipment } = useGame();
  const [activeButton, setActiveButton] = useState(null);

  //接收裝備type,設置ActiveButton & onEquipmentPartClick 為
  const handleButtonClick = (equipmentType) => {
    setActiveButton(equipmentType);
    onEquipmentPartClick(equipmentType);
  };

  return (
    <>
      <div className={isOpen ? "overlay" : ""}></div>

      <dialog open={isOpen} className={isOpen && `${className}`} tabIndex="0">
        <button onClick={onClose}>取消強化</button>
        {Object.entries(equipment).map(([type, item]) => (
          <button
            key={type}
            className={activeButton === type ? "active-button" : ""}
            onClick={() => handleButtonClick(type)}
          >
            {item.type}
            <span>
              Lv:{item.level} {item.name}
            </span>
          </button>
        ))}
      </dialog>
    </>
  );
};

export default StrengthenListModal;
