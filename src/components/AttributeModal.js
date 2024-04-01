import React, { useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import AttributeItem from "./AttributeItem";

function AttributeModal({ isOpen, onClose, title, title2 }) {
  const { equipment, currentStats } = useGame();
  const {
    baseStats: {
      attack: baseAttack,
      defense: baseDefense,
      resistance: baseResistance,
    },
    equippedStats: {
      attack: equippedAttack,
      defense: equippedDefense,
      resistance: equippedResistance,
    },
  } = currentStats;

  const totalAttack = baseAttack + equippedAttack;
  const totalDefense = baseDefense + equippedDefense;
  const totalResistance = baseResistance + equippedResistance;

  const attributes = [
    {
      name: "攻擊力",
      total: totalAttack,
      base: baseAttack,
      equipped: equippedAttack,
    },
    {
      name: "防禦力",
      total: totalDefense,
      base: baseDefense,
      equipped: equippedDefense,
    },
    {
      name: "火抗性",
      total: totalResistance,
      base: baseResistance,
      equipped: equippedResistance,
    },
    {
      name: "水抗性",
      total: totalResistance,
      base: baseResistance,
      equipped: equippedResistance,
    },
    {
      name: "冰抗性",
      total: totalResistance,
      base: baseResistance,
      equipped: equippedResistance,
    },
    {
      name: "雷抗性",
      total: totalResistance,
      base: baseResistance,
      equipped: equippedResistance,
    },
    {
      name: "毒抗性",
      total: totalResistance,
      base: baseResistance,
      equipped: equippedResistance,
    },
  ];

  useEffect(() => {
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
    <>
      <div className={isOpen ? "overlay" : ""}></div>
      <dialog
        open={isOpen}
        tabIndex="0"
        className={isOpen ? "attribute-wrapper overlay" : "hidden"}
      >
        <div className="cancel-button" onClick={onClose}>
          X
        </div>
        <div className="equipment list">
          <h2>{title}</h2>
          <hr />
          <ul>
            {equipment &&
              Object.entries(equipment).map(
                ([part, { item, strengthenLevel }], index, array) => (
                  <React.Fragment key={part}>
                    <li>
                      <span>
                        {part === "arms"
                          ? "武器"
                          : part === "helmet"
                          ? "頭盔"
                          : part === "armor"
                          ? "鎧甲"
                          : part === "legArmor"
                          ? "護腿"
                          : part === "gloves"
                          ? "護手"
                          : part === "boots"
                          ? "靴子"
                          : part === "amulet"
                          ? "護符"
                          : part === "ring"
                          ? "戒指"
                          : ""}
                      </span>
                      <span>Lv: {strengthenLevel && strengthenLevel}</span>
                      {item ? (
                        <>
                          <p>
                            {item.rarity && `[${item.rarity}]`} {item.name}
                          </p>
                        </>
                      ) : (
                        <p> 尚未裝備 </p>
                      )}
                    </li>
                    {index < array.length && <hr />}
                  </React.Fragment>
                )
              )}
          </ul>
        </div>

        <div className="attribute list">
          <h2>{title2}</h2>
          <hr />
          <ul>
            <ul>
              {attributes.map((attribute, index) => (
                <React.Fragment key={index}>
                  <AttributeItem
                    name={attribute.name}
                    total={attribute.total}
                    base={attribute.base}
                    equipped={attribute.equipped}
                  />
                  {index < attributes.length && <hr />}
                </React.Fragment>
              ))}
            </ul>
          </ul>
        </div>
      </dialog>
    </>
  );
}

export default AttributeModal;
