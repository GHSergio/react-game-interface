import React, { useState, useEffect } from "react";
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
  const [currentOpenModal, setCurrentOpenModal] = useState(null);

  //接收type 將其設為 選擇部位value
  const handleEquipmentPartClick = (equipmentType) => {
    setSelectedEquipmentPart(equipmentType);
    setIsStrengthenModalOpen(true);
    setCurrentOpenModal("StrengthenModal");
  };

  const handleCloseStrengthenModal = () => {
    setIsStrengthenModalOpen(false);
    setCurrentOpenModal(null);
  };

  //strengthenList 與 strengthen並存時,先關閉strengthen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isStrengthenListModalOpen) {
        if (e.key === "Escape" && currentOpenModal === "StrengthenModal") {
          e.preventDefault();
          setIsStrengthenModalOpen(false);
          setCurrentOpenModal(null);
        } else {
          setIsStrengthenListModalOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentOpenModal, isStrengthenListModalOpen]);

  return (
    <div className="container">
      <div className="action-container">
        <h2>持有金幣: ${gold}</h2>
        <button
          className={` ${isStrengthenListModalOpen ? "active-button " : ""}`}
          onClick={() => setIsStrengthenListModalOpen(true)}
        >
          強化
        </button>
      </div>
      <div className="content-container">
        {isStrengthenListModalOpen && (
          <StrengthenListModal
            isOpen={isStrengthenListModalOpen}
            onEquipmentPartClick={handleEquipmentPartClick}
            onClose={() => setIsStrengthenListModalOpen(false)}
            className="strengthen-container"
            // currentOpenModal={currentOpenModal}
          />
        )}

        {isStrengthenModalOpen && (
          <StrengthenModal
            isOpen={isStrengthenModalOpen}
            //將選取部位 傳遞給strengthenModal
            equipmentType={selectedEquipmentPart}
            onClose={handleCloseStrengthenModal}
          />
        )}
      </div>
    </div>
  );
};

export default Test2;
