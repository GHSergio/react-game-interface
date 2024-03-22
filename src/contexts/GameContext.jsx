import { useState, createContext, useContext } from "react";
import Swal from "sweetalert2";
// import { useBackpack } from "./BackpackContext";

export const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gold, setGold] = useState(1000);
  const [level, setLevel] = useState(1);
  const [topLevel, setTopLevel] = useState(false);
  const [experience, setExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(100);
  const [hp, setHp] = useState(100);
  const [maxHp, setMaxHp] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [maxEnergy, setMaxEnergy] = useState(100);
  const [equipment, setEquipment] = useState({
    sword: {
      type: "武器",
      name: "黑龍戰斧",
      rarity: "普通",
      level: 1,
      atk: 990,
    },
    shield: {
      type: "盾牌",
      name: "黑龍鋼盾",
      rarity: "普通",
      level: 1,
      def: 92,
    },
    armor: {
      type: "盔甲",
      name: "黑龍玄甲",
      rarity: "普通",
      level: 1,
      def: 92,
    },
    legArmor: {
      type: "腿甲",
      name: "黑龍護腿",
      rarity: "普通",
      level: 1,
      def: 92,
    },
    armGuard: {
      type: "手甲",
      name: "黑龍護手",
      rarity: "普通",
      level: 1,
      def: 92,
    },
    belt: { type: "腰帶", name: "黑龍腰帶", rarity: "普通", level: 1, def: 92 },
    cloak: {
      type: "披風",
      name: "暗影斗篷",
      rarity: "普通",
      level: 1,
      def: 92,
    },
    ring: {
      type: "戒指",
      name: "黑龍骨戒",
      rarity: "普通",
      level: 1,
      resistance: 5,
    },
    necklace: {
      type: "項鍊",
      name: "龍牙項鍊",
      rarity: "普通",
      level: 1,
      resistance: 5,
    },
  });
  const [items, setItems] = useState(Array(32).fill(null));
  //backpack
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isQuantityInputModalOpen, setIsQuantityInputModalOpen] =
    useState(false);
  const [quantityInputValue, setQuantityInputValue] = useState(1);

  const addItem = () => {
    // 在items內尋找第一個value為null的item,並 return item index
    const emptyIndex = items.findIndex((item) => item === null);
    //道具欄位全滿 (當findIndex 沒有符合 則返回-1)
    if (emptyIndex === -1) {
      fullAlert();
      return;
    }
    const newItem = {
      id: Date.now(),
      name: "回復藥",
      type: "藥水",
      healAmount: 50,
      quantity: 10,
      sellPrice: 50,
    };
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[emptyIndex] = newItem;
      return updatedItems;
    });
  };
  //Alert
  const fullAlert = () => {
    Swal.fire({
      title: "道具欄已滿",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // 删除物品
  const removeItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item && item.id === itemId ? null : item))
    );
  };

  // 使用物品
  const usedItem = (itemId, amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item && item.id === itemId
          ? { ...item, quantity: item.quantity - amount }
          : item
      )
    );
    const item = items.find((item) => item && item.id === itemId);
    if (item && item.healAmount) {
      increaseHp(item.healAmount * amount);
    }
    // 如果物品数量为 0，则删除物品
    if (item.quantity === 0) {
      removeItem(item.id);
    }
  };

  // 出售物品
  const sellItem = (item, amount) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem && prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity - amount }
          : prevItem
      )
    );
    // increaseGold(item.sellPrice);
    increaseGold(item.sellPrice * amount);
    // 如果物品数量为 0，则删除物品
    if (item.quantity === 0) {
      removeItem(item.id);
    }
  };

  // 丢弃物品
  const discardItem = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item && item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //增加金幣
  const increaseGold = (amount) => {
    const newGold = gold + amount;
    if (newGold > 999999) {
      return;
    }
    setGold(newGold);
  };

  //減少金幣
  const decreaseGold = (amount) => {
    const newGold = gold - amount;
    if (newGold < 0) {
      return;
    }
    setGold(newGold);
  };

  //增加經驗值
  const increaseExperience = () => {
    if (level === 99) {
      return;
    }
    const newExperience = experience + 100;
    if (newExperience >= maxExperience) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setMaxExperience(maxExperience + 100);
      setExperience(newExperience - maxExperience);
      //提升MaxHp, Hp --> MaxHp 回滿
      setMaxHp((prevMaxHp) => prevMaxHp + 10);
      setMaxEnergy((prevMaxEnergy) => prevMaxEnergy + 10);
      setHp(maxHp + 10);
      //剛滿等
      if (newLevel === 99) {
        setTopLevel(true);
        setMaxExperience(0);
        setExperience(maxExperience);
      }
    } else {
      setExperience(newExperience);
    }
  };

  //減少能量
  const decreaseEnergy = (amount) => {
    const newEnergy = energy - amount;
    if (newEnergy < 0) {
      return;
    }
    setEnergy(newEnergy);
  };

  //增加能量
  const increaseEnergy = (amount) => {
    const newEnergy = energy + amount;
    const updatedEnergy = newEnergy > maxEnergy ? maxEnergy : newEnergy;

    setEnergy(updatedEnergy);
  };

  //恢復體力
  const increaseHp = (amount) => {
    const newHp = hp + amount;
    const updatedHp = newHp > maxHp ? maxHp : newHp;
    setHp(updatedHp);
  };

  //扣除體力
  const decreaseHp = (amount) => {
    const newHp = hp - amount;
    if (newHp <= 1) {
      return;
    }
    setHp(newHp);
  };

  //增加裝備等級
  const increaseEquipmentLevel = (equipmentType) => {
    setEquipment((prevEquipment) => {
      if (!prevEquipment[equipmentType]) {
        console.error(`Equipment type ${equipmentType} not found.`);
        return prevEquipment;
      }

      const updatedEquipment = {
        ...prevEquipment[equipmentType],
        level: prevEquipment[equipmentType].level + 1,
      };

      if (updatedEquipment.level === 5) {
        updatedEquipment.rarity = "精良";
      } else if (updatedEquipment.level === 10) {
        updatedEquipment.rarity = "極品";
      } else if (updatedEquipment.level === 15) {
        updatedEquipment.rarity = "傳說";
      }

      if (updatedEquipment.atk) updatedEquipment.atk += 10;
      if (updatedEquipment.def) updatedEquipment.def += 2;
      if (updatedEquipment.resistance) updatedEquipment.resistance += 5;

      return {
        ...prevEquipment,
        [equipmentType]: updatedEquipment,
      };
    });
  };

  //添加物品
  const handleAddItemClick = () => {
    addItem();
  };

  //右鍵開啟選單,設activeIndex
  const handleRightClick = (e, index) => {
    e.preventDefault();
    setIsMenuModalOpen(true);
    setActiveItemIndex(index);
  };

  //關閉MenuModal
  const handleCloseContextMenu = () => {
    setIsMenuModalOpen(false);
  };

  const handleItemClick = (action) => {
    const item = items[activeItemIndex];
    if (!item) return; // 确保物品存在
    if (action === "use" && item.quantity > 0) {
      setIsQuantityInputModalOpen(true);
    } else if (action === "sell" && item.quantity > 0) {
      setIsQuantityInputModalOpen(true);
    } else if (action === "cancel") {
      setIsQuantityInputModalOpen(false);
      handleCloseContextMenu();
    }
    handleCloseContextMenu();
  };

  return (
    <GameContext.Provider
      value={{
        gold,
        level,
        topLevel,
        equipment,
        experience,
        maxExperience,
        energy,
        maxHp,
        hp,
        maxEnergy,
        setMaxEnergy,
        setEquipment,
        setEnergy,
        increaseGold,
        decreaseGold,
        increaseExperience,
        increaseEquipmentLevel,
        decreaseEnergy,
        increaseEnergy,
        increaseHp,
        decreaseHp,

        items,
        setItems,
        addItem,
        usedItem,
        sellItem,
        discardItem,

        isMenuModalOpen,
        setIsMenuModalOpen,
        activeItemIndex,
        setActiveItemIndex,
        isQuantityInputModalOpen,
        setIsQuantityInputModalOpen,
        quantityInputValue,
        setQuantityInputValue,
        handleAddItemClick,
        handleRightClick,
        handleCloseContextMenu,
        handleItemClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
