import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";

const ButtonModal = ({ equipmentType, isOpen, onConfirm, onClose }) => {
  const [top, setTop] = useState(false);
  const [color, setColor] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { gold, equipmentLevel, decreaseGold, increaseEquipmentLevel } =
    useGame();

  //主要設定click 扣money& 增加equipmentLevel
  const clickHandler = () => {
    if (gold - 100 < 0) {
      alert("金幣不足,無法強化");
      return;
    }
    if (!equipmentLevel[equipmentType]) {
      console.error(`Equipment type ${equipmentType} not found.`);
      return;
    }
    if (equipmentLevel[equipmentType].level === 15) {
      return;
    }
    increaseEquipmentLevel(equipmentType);
    decreaseGold(100);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250);
  };

  useEffect(() => {
    const currentEquipment = equipmentLevel[equipmentType];
    if (!currentEquipment) {
      return;
    }
    const { rarity, level } = currentEquipment;

    let color;
    switch (rarity) {
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

    if (level === 15) {
      setTop(true);
      setIsDisabled(true);
    } else {
      setTop(false);
      setIsDisabled(false);
    }
  }, [equipmentLevel, equipmentType]);

  return (
    <>
      <dialog open={isOpen} className="button-container" tabIndex="0">
        <div>
          <span>稀有度: </span>
          <span style={{ color: color }}>
            {equipmentLevel[equipmentType].rarity}
          </span>
        </div>
        <p>
          {equipmentLevel[equipmentType].name} :Lv
          {equipmentLevel[equipmentType].level}
        </p>
        {equipmentLevel[equipmentType].atk && (
          <p>攻擊:{equipmentLevel[equipmentType].atk}</p>
        )}
        {equipmentLevel[equipmentType].def && (
          <p>防禦:{equipmentLevel[equipmentType].def}</p>
        )}
        {equipmentLevel[equipmentType].resistance && (
          <p>抗性:{equipmentLevel[equipmentType].resistance}</p>
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

export default ButtonModal;
