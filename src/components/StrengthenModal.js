import React, { useEffect, useState } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";
import Swal from "sweetalert2";

const StrengthenModal = ({ equipmentPart, isOpen, onClose }) => {
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

  const topAlert = () => {
    Swal.fire({
      title: "已達上限,無法強化",
      showConfirmButton: false,
      timer: 1000,
      position: "top",
    });
  };

  //主要設定click 扣money& 增加equipmentLevel
  const clickHandler = () => {
    const currentEquipment = equipment?.[equipmentPart];
    if (!currentEquipment) {
      return;
    }
    if (gold - 100 < 0) {
      showAlert();
      return;
    }
    if (currentEquipment?.strengthenLevel === 15) {
      topAlert();
      return;
    }
    increaseEquipmentLevel(equipmentPart);
    decreaseGold(100);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  useEffect(() => {
    //接收equipment 傳遞的 選擇部位 --> 設為currentEquipment
    const currentEquipment = equipment?.[equipmentPart];
    if (!currentEquipment || !currentEquipment.item) {
      return;
    }
    setCurrentEquipment(currentEquipment);

    let color;
    switch (currentEquipment?.item?.rarity) {
      case "精良":
        color = "lightgreen";
        break;
      case "極品":
        color = "lightblue";
        break;
      case "傳說":
        color = "gold";
        break;
      default:
        color = "grey";
    }
    setColor(color);

    if (currentEquipment?.strengthenLevel === 15) {
      setTop(true);
      setIsDisabled(true);
    } else {
      setTop(false);
      setIsDisabled(false);
    }
  }, [equipment, equipmentPart]);

  return (
    <>
      <div className={isOpen ? "overlay" : ""}></div>

      <dialog open={isOpen} className="button-container" tabIndex="0">
        <div className="strengthen-content">
          <div>
            <span>稀有度: </span>
            <span style={{ color: color, fontSize: "1.15rem" }}>
              {currentEquipment?.item?.rarity}
            </span>
          </div>
          <p> Lv: {currentEquipment?.strengthenLevel}</p>
          <p>{currentEquipment?.item?.name}</p>
          {currentEquipment?.item?.atk && (
            <p>攻擊:{currentEquipment?.item?.atk}</p>
          )}
          {currentEquipment?.item?.def && (
            <p>防禦:{currentEquipment?.item?.def}</p>
          )}
          {currentEquipment?.item?.resistance && (
            <p>抗性:{currentEquipment?.item?.resistance}</p>
          )}
          <div className="strengthen-button">
            <button
              disabled={isDisabled}
              className={isClicked ? "scale-down" : ""}
              onClick={clickHandler}
            >
              {top ? "已達上限" : "強化"}
            </button>
            <button onClick={onClose}>取消</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default StrengthenModal;
