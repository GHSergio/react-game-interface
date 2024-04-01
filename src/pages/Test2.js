import React, { useState, useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";
import StrengthenModal from "../components/StrengthenModal";
import StrengthenListModal from "../components/StrengthenListModal";
import StatsEffect from "../components/StatsEffect";
import Swal from "sweetalert2";

const Test2 = () => {
  const { gold, equipment } = useGame();
  const [isStrengthenListModalOpen, setIsStrengthenListModalOpen] =
    useState(false);
  const [isStrengthenModalOpen, setIsStrengthenModalOpen] = useState(false);
  //onClick 哪個 part
  const [selectedEquipmentPart, setSelectedEquipmentPart] = useState(null);
  const [currentOpenModal, setCurrentOpenModal] = useState(null);

  //接收type 將其設為 選擇部位value
  const handleEquipmentPartClick = (equipmentPart) => {
    const equippedItem = equipment[equipmentPart];
    if (equippedItem.item && Object.keys(equippedItem).length !== 0) {
      setSelectedEquipmentPart(equipmentPart);
      setIsStrengthenModalOpen(true);
      setCurrentOpenModal("StrengthenModal");
    } else {
      Swal.fire({
        html: `
        <p>部位尚未裝備</p>
        <p>無法進行強化</p>
        `,
        showConfirmButton: false,
        width: 250,
        timer: 1000,
      });
    }
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
          />
        )}

        {isStrengthenModalOpen && (
          <StrengthenModal
            isOpen={isStrengthenModalOpen}
            //將選取部位 傳遞給strengthenModal
            equipmentPart={selectedEquipmentPart}
            onClose={handleCloseStrengthenModal}
          />
        )}
      </div>
      <StatsEffect />
    </div>
  );
};

export default Test2;
