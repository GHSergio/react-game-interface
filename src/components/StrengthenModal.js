import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";
import Swal from "sweetalert2";

const StrengthenModal = ({ equipmentType, isOpen, onClose }) => {
  const [top, setTop] = useState(false);
  const [color, setColor] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);

  const { gold, equipment, decreaseGold, increaseEquipmentLevel } = useGame();

  const showAlert = () => {
    Swal.fire({
      title: "金幣不足,無法強化",
      showConfirmButton: false,
      timer: 1000,
      position: "top",
    });
  };

  useEffect(() => {
    //callback
    const handleKeyDown = (e) => {
      if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    //清理函數 --> 卸載eventListener 避免佔用記憶體
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; //依賴陣列
  }, [isOpen, onClose]);

  //主要設定click 扣money& 增加equipmentLevel
  const clickHandler = () => {
    if (gold - 100 < 0) {
      showAlert();
      return;
    }
    if (!currentEquipment) {
      console.error(`Equipment type ${equipmentType} not found.`);
      return;
    }
    if (currentEquipment.level === 15) {
      return;
    }

    increaseEquipmentLevel(equipmentType);
    decreaseGold(100);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  useEffect(() => {
    const currentEquipment = equipment?.[equipmentType];
    if (!equipment) {
      return;
    }
    setCurrentEquipment(currentEquipment);

    let color;
    switch (currentEquipment.rarity) {
      case "精良":
        color = "blue";
        break;
      case "極品":
        color = "yellow";
        break;
      case "傳說":
        color = "gold";
        break;
      default:
        color = "grey";
    }
    setColor(color);

    if (currentEquipment.level === 15) {
      setTop(true);
      setIsDisabled(true);
    } else {
      setTop(false);
      setIsDisabled(false);
    }
  }, [equipment, equipmentType]);

  return (
    <>
      <dialog
        open={isOpen}
        className="button-container inner-container"
        tabIndex="0"
      >
        <div>
          <span>稀有度: </span>
          <span style={{ color: color, fontSize: "1.15rem" }}>
            {currentEquipment?.rarity}
          </span>
        </div>
        <p>
          {currentEquipment?.name}: Lv
          {currentEquipment?.level}
        </p>
        {currentEquipment?.atk && <p>攻擊:{currentEquipment?.atk}</p>}
        {currentEquipment?.def && <p>防禦:{currentEquipment?.def}</p>}
        {currentEquipment?.resistance && (
          <p>抗性:{currentEquipment?.resistance}</p>
        )}
        <button
          disabled={isDisabled}
          className={isClicked ? "scale-down" : ""}
          onClick={clickHandler}
        >
          {top ? "已達上限!!" : "點我強化"}
        </button>
      </dialog>
    </>
  );
};

export default StrengthenModal;
