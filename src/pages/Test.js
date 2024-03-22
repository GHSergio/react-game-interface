import { useState, useEffect, useCallback, useReducer } from "react";
import { useGame } from "../contexts/GameContext";
import "../styles/style.scss";
import ConfirmationModal from "../components/ConfirmationModal";
import BackpackModal from "../components/BackpackModal";
import AttributeModal from "../components/AttributeModal";
import Swal from "sweetalert2";

const showAlert = () => {
  Swal.fire({
    title: "金幣不足",
    showConfirmButton: false,
    timer: 1000,
  });
};
//定義初始狀態
const initialState = {
  isExploreModalOpen: false,
  isEnergyEmptyModalOpen: false,
  isBreakModalOpen: false,
  isOverflowConfirmModalOpen: false,
  isMiningModalOpen: false,
};

//定義不同action --> state變更
function reducer(state, action) {
  switch (action.type) {
    case "OPEN_EXPLORE_MODAL":
      return { ...state, isExploreModalOpen: true };
    case "CLOSE_EXPLORE_MODAL":
      return { ...state, isExploreModalOpen: false };

    case "OPEN_EMPTY_MODAL":
      return { ...state, isEnergyEmptyModalOpen: true };
    case "CLOSE_EMPTY_MODAL":
      return { ...state, isEnergyEmptyModalOpen: false };

    case "OPEN_BREAK_MODAL":
      return { ...state, isBreakModalOpen: true };
    case "CLOSE_BREAK_MODAL":
      return { ...state, isBreakModalOpen: false };

    case "OPEN_OVERFLOW_MODAL":
      return { ...state, isOverflowConfirmModalOpen: true };
    case "CLOSE_OVERFLOW_MODAL":
      return { ...state, isOverflowConfirmModalOpen: false };

    case "OPEN_MINING_MODAL":
      return { ...state, isMiningModalOpen: true };
    case "CLOSE_MINING_MODAL":
      return { ...state, isMiningModalOpen: false };

    case "CLOSE_ALL_MODALS":
      return {
        ...state,
        isExploreModalOpen: false,
        isEnergyEmptyModalOpen: false,
        isBreakModalOpen: false,
        isOverflowConfirmModalOpen: false,
        isMiningModalOpen: false,
      };
    default:
      throw new Error();
  }
}

function Test() {
  const {
    gold,
    level,
    topLevel,
    hp,
    maxHp,
    energy,
    maxEnergy,
    setEnergy,
    experience,
    maxExperience,
    increaseExperience,
    increaseGold,
    decreaseGold,
    increaseEnergy,
    decreaseEnergy,
    increaseHp,
    decreaseHp,
  } = useGame();

  const [isBackpackModalOpen, setIsBackpackModalOpen] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);

  // //Modal
  const [modalState, dispatch] = useReducer(reducer, initialState);

  // dispatch Modal state
  //關閉所有modal
  const handleCloseAllModals = useCallback(() => {
    dispatch({ type: "CLOSE_ALL_MODALS" });
    setIsBackpackModalOpen(false);
    setIsAttributeModalOpen(false);
  }, []);
  // Explore
  const openExploreModal = useCallback(() => {
    handleCloseAllModals();
    dispatch({ type: "OPEN_EXPLORE_MODAL" });
  }, [handleCloseAllModals]);

  const closeExploreModal = () => {
    dispatch({ type: "CLOSE_EXPLORE_MODAL" });
  };

  // EnergyEmpty
  const openEnergyEmptyModal = useCallback(() => {
    handleCloseAllModals();
    dispatch({ type: "OPEN_EMPTY_MODAL" });
  }, [handleCloseAllModals]);

  const closeEnergyEmptyModal = () => dispatch({ type: "CLOSE_EMPTY_MODAL" });

  // Break
  const openBreakModal = useCallback(() => {
    handleCloseAllModals();
    dispatch({ type: "OPEN_BREAK_MODAL" });
  }, [handleCloseAllModals]);

  const closeBreakModal = () => dispatch({ type: "CLOSE_BREAK_MODAL" });

  // Overflow
  const openOverflowModal = useCallback(() => {
    handleCloseAllModals();
    dispatch({ type: "OPEN_OVERFLOW_MODAL" });
  }, [handleCloseAllModals]);
  const closeOverflowModal = () => dispatch({ type: "CLOSE_OVERFLOW_MODAL" });

  // Mining
  const openMiningModal = useCallback(() => {
    handleCloseAllModals();
    dispatch({ type: "OPEN_MINING_MODAL" });
  }, [handleCloseAllModals]);

  const closeMiningModal = () => {
    dispatch({ type: "CLOSE_MINING_MODAL" });
  };

  //Modal Handler (依賴陣列 --> 引用的外部值)
  const handleExploreConfirm = useCallback(() => {
    if (energy < 20 || hp < 30) {
      handleCloseAllModals();
      openEnergyEmptyModal();
      return;
    }
    decreaseEnergy(20);
    decreaseHp(30);
    increaseGold(500);
    increaseExperience();
    handleCloseAllModals();
  }, [
    hp,
    energy,
    increaseGold,
    increaseExperience,
    decreaseEnergy,
    decreaseHp,
    openEnergyEmptyModal,
    handleCloseAllModals,
  ]);

  //能量不足
  const handleEmptyConfirm = useCallback(() => {
    if (gold < 1000) {
      showAlert();
      return;
    }
    decreaseGold(1000);
    increaseEnergy(50);
    increaseHp(50);
    handleCloseAllModals();
  }, [gold, increaseEnergy, decreaseGold, increaseHp, handleCloseAllModals]);

  const handleBreakConfirm = useCallback(() => {
    if (gold < 2000) {
      showAlert();
      return;
    }

    const newEnergy = energy + 50;
    if (newEnergy > 100) {
      handleCloseAllModals();
      openOverflowModal();
      return;
    } else {
      decreaseGold(2000);
      increaseHp(maxHp);
      increaseEnergy(maxEnergy);
      handleCloseAllModals();
    }
  }, [
    gold,
    energy,
    maxHp,
    maxEnergy,
    increaseHp,
    increaseEnergy,
    decreaseGold,
    openOverflowModal,
    handleCloseAllModals,
  ]);

  //提醒能量溢出
  const handleOverflowConfirm = useCallback(() => {
    decreaseGold(500);
    setEnergy(100);
    handleCloseAllModals();
  }, [decreaseGold, setEnergy, handleCloseAllModals]);

  //挖礦
  const handleMiningConfirm = useCallback(() => {
    if (energy < 20) {
      handleCloseAllModals();
      openEnergyEmptyModal();
      return;
    }
    decreaseEnergy(20);
    increaseGold(1000);
    handleCloseAllModals();
  }, [
    increaseGold,
    energy,
    decreaseEnergy,
    openEnergyEmptyModal,
    handleCloseAllModals,
  ]);

  // 快捷鍵 keyDown handler
  // 使用 useCallback 來優化函數
  const handleBackpackKeyDown = useCallback(() => {
    setIsBackpackModalOpen((preState) => !preState);
  }, []);

  const handleAttributeKeyDown = useCallback(() => {
    setIsAttributeModalOpen((preState) => !preState);
  }, []);

  const handleExploreKeyDown = useCallback(() => {
    handleCloseAllModals();
    openExploreModal();
  }, [openExploreModal, handleCloseAllModals]);

  const handleBreakKeyDown = useCallback(() => {
    handleCloseAllModals();
    openBreakModal();
  }, [openBreakModal, handleCloseAllModals]);

  const handleMiningKeyDown = useCallback(() => {
    handleCloseAllModals();
    openMiningModal();
  }, [openMiningModal, handleCloseAllModals]);

  //制定 keyDown 快捷鍵
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
      }
      switch (e.key.toUpperCase()) {
        case "B":
          handleBackpackKeyDown();
          break;
        case "A":
          handleAttributeKeyDown();
          break;
        case "E":
          handleExploreKeyDown();
          break;
        case "Q":
          handleBreakKeyDown();
          break;
        case "M":
          handleMiningKeyDown();
          break;
        case "ESCAPE":
          handleCloseAllModals();
          break;
        default:
          break;
      }
    },
    [
      handleBackpackKeyDown,
      handleAttributeKeyDown,
      handleExploreKeyDown,
      handleBreakKeyDown,
      handleMiningKeyDown,
      handleCloseAllModals,
    ]
  );

  //初始添加 handleKeyDown
  //當依賴項變動,則移除handleKeyDown,並添加新的handleKeyDown
  //避免占用記憶體
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, handleCloseAllModals]);

  return (
    <div className="container">
      <div className="action-container">
        <h2>持有金幣: ${gold}</h2>
        <button
          className={` ${isBackpackModalOpen ? "active-button" : ""}`}
          onClick={() => setIsBackpackModalOpen((preState) => !preState)}
        >
          背包[B]
        </button>
        <button
          className={` ${isAttributeModalOpen ? "active-button" : ""}`}
          onClick={() => setIsAttributeModalOpen((prevState) => !prevState)}
        >
          屬性[A]
        </button>
        <button
          className={` ${modalState.isExploreModalOpen ? "active-button" : ""}`}
          onClick={openExploreModal}
        >
          探索[E]
        </button>
        <button
          className={` ${modalState.isBreakModalOpen ? "active-button" : ""}`}
          onClick={openBreakModal}
        >
          休息[Q]
        </button>
        <button
          className={` ${modalState.isMiningModalOpen ? "active-button" : ""}`}
          onClick={openMiningModal}
        >
          採礦[M]
        </button>
      </div>
      {/* Modal */}
      <div className="backpack-container">
        <BackpackModal
          className="backpack item-container"
          title="背包"
          // isOpen={modalState.isBackpackModal}
          isOpen={isBackpackModalOpen}
          onClose={() => setIsBackpackModalOpen(false)}
        />
      </div>
      <div className="attribute-container inner-container">
        <AttributeModal
          className="attribute-wrapper"
          title="裝備"
          title2="屬性"
          isOpen={isAttributeModalOpen}
          onClose={() => setIsAttributeModalOpen(false)}
        />
      </div>
      <div className="explore-container inner-container">
        <ConfirmationModal
          className="exploreModal"
          title="是否進行探索?"
          message="消耗 20能量 & 50體力"
          message2="獲取 100經驗值 & $500金幣"
          confirmMessage="前往探索"
          cancelMessage="再準備一下"
          isOpen={modalState.isExploreModalOpen}
          onClose={closeExploreModal}
          onConfirm={handleExploreConfirm}
        />

        <ConfirmationModal
          className="emptyModal"
          title="能量不足 是否補充能量?"
          message="消耗 $1000"
          message2="補充 50能量 & 50體力"
          confirmMessage="補充能量"
          cancelMessage="讓我想想"
          isOpen={modalState.isEnergyEmptyModalOpen}
          onClose={closeEnergyEmptyModal}
          onConfirm={handleEmptyConfirm}
        />
      </div>
      <div className="break-container inner-container">
        <ConfirmationModal
          className="breakModal"
          title="確定要休息?"
          message="消耗 $2000金幣"
          message2="完全回復 能量 & 體力"
          confirmMessage="我確定"
          cancelMessage="再撐一下"
          isOpen={modalState.isBreakModalOpen}
          onClose={closeBreakModal}
          onConfirm={handleBreakConfirm}
        />

        <ConfirmationModal
          className="overflowConfirmModal modal"
          title="現在休息 能量將會溢出"
          message="仍要休息嗎?"
          confirmMessage="堅持休息"
          cancelMessage="那先不要"
          isOpen={modalState.isOverflowConfirmModalOpen}
          onClose={closeOverflowModal}
          onConfirm={handleOverflowConfirm}
        />
      </div>
      <div className="mining-container inner-container">
        <ConfirmationModal
          className="MiningModal"
          title="是否進行採礦?"
          message="消耗 20能量"
          message2="獲取 $1000金幣"
          confirmMessage="前往採礦"
          cancelMessage="再準備一下"
          isOpen={modalState.isMiningModalOpen}
          onClose={closeMiningModal}
          onConfirm={handleMiningConfirm}
        />

        <ConfirmationModal
          className="emptyModal"
          title="能量不足 是否補充能量?"
          message="消耗 $1000"
          message2="補充 50能量"
          confirmMessage="補充能量"
          cancelMessage="讓我想想"
          isOpen={modalState.isEnergyEmptyModalOpen}
          onClose={closeEnergyEmptyModal}
          onConfirm={handleEmptyConfirm}
        />
      </div>
      <div className="content-container">
        <div className="state-container">
          <h2>Lv: {level}</h2>
          <h2>
            經驗值: {topLevel ? "MAX" : experience} 升級需求:{" "}
            {topLevel ? "MAX" : maxExperience}
          </h2>
          <div className="progress-bar-outer">
            <div
              className="progress-bar"
              style={{
                width: `${
                  topLevel ? 100 : (experience / maxExperience) * 100
                }%`,
                backgroundColor: "white",
              }}
            ></div>
          </div>
          <h2>
            體力: {hp}/{maxHp}
          </h2>
          <div className="progress-bar-outer">
            <div
              className="progress-bar"
              style={{
                width: `${(hp / maxHp) * 100}%`,
                backgroundColor: "#4caf50",
              }}
            ></div>
          </div>
          <h2>
            能量: {energy}/{maxEnergy}
          </h2>
          <div className="progress-bar-outer">
            <div
              className="progress-bar"
              style={{
                width: `${(energy / maxEnergy) * 100}%`,
                backgroundColor: "yellow",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
