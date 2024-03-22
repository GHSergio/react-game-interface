import React, { useEffect } from "react";
import { useGame } from "../contexts/GameContext";

function AttributeModal({ isOpen, onClose, title, title2, className }) {
  const { level, equipment } = useGame();

  //升級能力累加邏輯
  function useCalculateStats(equipmentLevel) {
    const baseAttack = level * 10;
    const baseDefense = level * 10;
    const baseResistance = level * 5;
    // 迭代數組中的每個項目，
    //將atk每個項目的值加到累加器 ( acc) 中。
    //如果某項沒有屬性atk，則使用0 ( item.atk || 0)。
    //累加器的初始值為0。
    const totalAttack =
      baseAttack +
      Object.values(equipmentLevel).reduce(
        (acc, item) => acc + (item.atk || 0),
        0
      );
    const totalDefense =
      baseDefense +
      Object.values(equipmentLevel).reduce(
        (acc, item) => acc + (item.def || 0),
        0
      );
    const totalResistance =
      baseResistance +
      Object.values(equipmentLevel).reduce(
        (acc, item) => acc + (item.resistance || 0),
        0
      );
    return { totalAttack, totalDefense, totalResistance };
  }
  const { totalAttack, totalDefense, totalResistance } =
    useCalculateStats(equipment);

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

  return (
    <dialog
      open={isOpen}
      tabIndex="0"
      className={isOpen ? ` ${className}` : "hidden"}
    >
      <div className="equipment list">
        <h2>{title}</h2>
        <hr />
        <ul>
          {Object.entries(equipment).map(([type, item], index, array) => (
            <React.Fragment key={type}>
              <li key={type}>
                {item.type} Lv: {item.level}
                <p>
                  [{item.rarity}] {item.name}
                </p>
              </li>
              {index < array.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="attribute list">
        <h2>{title2}</h2>
        <hr />
        <ul>
          <li>攻擊力: {totalAttack}</li>
          <hr />
          <li>防禦力: {totalDefense}</li>
          <hr />
          <li>火抗性: {totalResistance}</li>
          <hr />
          <li>水抗性: {totalResistance}</li> <hr />
          <li>冰抗性: {totalResistance}</li> <hr />
          <li>雷抗性: {totalResistance}</li> <hr />
          <li>風抗性: {totalResistance}</li>
          <hr />
          <li>毒抗性: {totalResistance}</li>
          <hr />
        </ul>
      </div>
    </dialog>
  );
}

export default AttributeModal;
