import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";
import StrengthenModal from "../components/StrengthenModal";
import StrengthenListModal from "../components/StrengthenListModal";

const Test2 = () => {
  const { gold } = useGame();
  const [isStrengthenListModalOpen, setIsStrengthenListModalOpen] =
    useState(false);
  const [isStrengthenModalOpen, setIsStrengthenModalOpen] = useState(false);
  //onClick 哪個 part
  const [selectedEquipmentPart, setSelectedEquipmentPart] = useState(null);

  const handleEquipmentPartClick = (equipmentType) => {
    setSelectedEquipmentPart(equipmentType);
    setIsStrengthenModalOpen(true);
  };

  return (
    <div className="container">
      <div className="action-container">
        <h2>持有金幣: ${gold}</h2>
        <div className="inner-container">
          <button
            className={` ${isStrengthenListModalOpen ? "active-button" : ""}`}
            onClick={() =>
              setIsStrengthenListModalOpen((prevState) => !prevState)
            }
          >
            強化
          </button>
        </div>
      </div>
      {isStrengthenListModalOpen && (
        <StrengthenListModal
          isOpen={isStrengthenListModalOpen}
          onEquipmentPartClick={handleEquipmentPartClick}
        />
      )}
      {isStrengthenModalOpen && (
        <StrengthenModal
          isOpen={isStrengthenModalOpen}
          onClose={() => setIsStrengthenModalOpen(false)}
          equipmentType={selectedEquipmentPart}
        />
      )}
    </div>
  );
};

export default Test2;
