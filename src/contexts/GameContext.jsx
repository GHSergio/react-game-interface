import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

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
    arms: {
      strengthenLevel: 0,
      item: null,
    },
    helmet: { strengthenLevel: 0, item: null },
    armor: { strengthenLevel: 0, item: null },
    legArmor: { strengthenLevel: 0, item: null },
    gloves: { strengthenLevel: 0, item: null },
    boots: { strengthenLevel: 0, item: null },
    amulet: { strengthenLevel: 0, item: null },
    ring: { strengthenLevel: 0, item: null },
  });
  const [items, setItems] = useState(Array(32).fill(null));

  //backpack
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isQuantityInputModalOpen, setIsQuantityInputModalOpen] =
    useState(false);
  const [quantityInputValue, setQuantityInputValue] = useState(1);
  const [currentStats, setCurrentStats] = useState({
    baseStats: {
      attack: 0,
      defense: 0,
      resistance: 0,
    },
    equippedStats: {
      attack: 0,
      defense: 0,
      resistance: 0,
    },
  });

  const itemList = [
    {
      id: uuidv4(),
      name: "回復藥",
      class: "物品",
      type: "藥水",
      healAmount: 50,
      quantity: 10,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "戰利品",
      class: "物品",
      type: "戰利品",
      quantity: 10,
      sellPrice: 100,
    },
    {
      id: uuidv4(),
      name: "黑龍戰斧",
      class: "裝備",
      type: "武器",
      rarity: "普通",
      level: 1,
      atk: 990,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍骨盔",
      class: "裝備",
      type: "頭盔",
      rarity: "普通",
      level: 1,
      def: 92,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍鱗甲",
      class: "裝備",
      type: "鎧甲",
      rarity: "普通",
      level: 1,
      def: 92,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍腿甲",
      class: "裝備",
      type: "護腿",
      rarity: "普通",
      level: 1,
      def: 92,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍手甲",
      class: "裝備",
      type: "護手",
      rarity: "普通",
      level: 1,
      def: 92,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍鱗靴",
      class: "裝備",
      type: "靴子",
      rarity: "普通",
      level: 1,
      def: 92,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "黑龍骨戒",
      class: "裝備",
      type: "戒指",
      rarity: "普通",
      level: 1,
      resistance: 5,
      quantity: 1,
      sellPrice: 50,
    },
    {
      id: uuidv4(),
      name: "龍牙護符",
      class: "裝備",
      type: "護符",
      rarity: "普通",
      level: 1,
      resistance: 5,
      quantity: 1,
      sellPrice: 50,
    },
  ];

  //隨機獲取
  const randomChoice = (arr) => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  };

  const addItem = () => {
    // 在items內尋找第一個value為null的item,並 return item index
    const emptyIndex = items.findIndex((item) => item === null);
    //道具欄位全滿 (當findIndex 沒有符合 則返回-1)
    if (emptyIndex === -1) {
      fullAlert();
      return;
    }
    // 從itemList隨機選擇一個物品
    const newItem = randomChoice(itemList);
    addItemAlert(newItem);
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

  const addItemAlert = (item) => {
    Swal.fire({
      title: `探索 獲得 ${item.name} * ${item.quantity}`,
    });
  };

  // 更新物品數量
  const updateItemAndQuantity = (item, amount) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((prevItem) =>
        prevItem && prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity - amount }
          : prevItem
      );
      return updatedItems;
    });
  };

  // 使用物品 更新item數量 執行物品效果
  const usedItem = (item, amount) => {
    updateItemAndQuantity(item, amount);
    if (item.healAmount) {
      increaseHp(item.healAmount * amount);
    }
  };

  // 出售物品 更新item數量 增加金幣
  const sellItem = (item, amount) => {
    updateItemAndQuantity(item, amount);
    increaseGold(item.sellPrice * amount);
  };

  // 删除物品 將該item改為null 而不是filter
  // 避免itemBlock因為item被移除 背包欄位消失
  const removeItem = useCallback((itemId) => {
    setItems((prevItems) =>
      //將ItemId該項 --> 設為null , 其餘維持原item
      prevItems.map((item) => (item && item.id === itemId ? null : item))
    );
  }, []);

  // 丢弃物品
  const discardItem = (itemId, amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item && item.id === itemId
          ? { ...item, quantity: item.quantity - amount }
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

  //添加物品
  const handleAddItemClick = () => {
    addItem();
  };

  //關閉MenuModal
  const handleCloseContextMenu = () => {
    setIsMenuModalOpen(false);
  };

  //右鍵開啟選單,設activeIndex
  const handleRightClick = (e, index) => {
    e.preventDefault();
    setIsMenuModalOpen(true);
    setActiveItemIndex(index);
  };

  //MenuModal action 影響 QuantityInputModalOpen
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

  //裝備 根據item.type去更新匹配的位置
  const equipItem = (item) => {
    switch (item.type) {
      case "武器":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          arms: { ...prevEquipment.arms, item: item },
        }));
        break;
      case "頭盔":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          helmet: { ...prevEquipment.helmet, item: item },
        }));
        break;
      case "鎧甲":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          armor: { ...prevEquipment.armor, item: item },
        }));
        break;
      case "護腿":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          legArmor: { ...prevEquipment.legArmor, item: item },
        }));
        break;
      case "護手":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          gloves: { ...prevEquipment.gloves, item: item },
        }));
        break;
      case "靴子":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          boots: { ...prevEquipment.boots, item: item },
        }));
        break;
      case "護符":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          amulet: { ...prevEquipment.amulet, item: item },
        }));
        break;
      case "戒指":
        setEquipment((prevEquipment) => ({
          ...prevEquipment,
          ring: { ...prevEquipment.ring, item: item },
        }));
        break;
      default:
        console.error("Unknown item type:", item.type);
    }
  };

  // 裝備升级邏輯
  const increaseEquipmentLevel = (equipmentPart) => {
    setEquipment((prevEquipment) => {
      const equipment = prevEquipment[equipmentPart];
      if (!equipment) {
        console.error(`Equipment type ${equipmentPart} not found.`);
        return prevEquipment;
      }

      const { strengthenLevel } = equipment;
      const updatedStrengthenLevel = strengthenLevel + 1;
      const { atk, def, resistance } = equipment.item;
      let updatedRarity = equipment.item.rarity;

      if (updatedStrengthenLevel === 5) updatedRarity = "精良";
      else if (updatedStrengthenLevel === 10) updatedRarity = "極品";
      else if (updatedStrengthenLevel === 15) updatedRarity = "傳說";

      const updatedEquipment = {
        ...equipment,
        strengthenLevel: updatedStrengthenLevel,
        item: {
          ...equipment.item,
          rarity: updatedRarity,
          atk: atk ? atk + 10 : undefined,
          def: def ? def + 2 : undefined,
          resistance: resistance ? resistance + 5 : undefined,
        },
      };

      // 使用 setEquipment 更新裝備狀態
      return {
        ...prevEquipment,
        [equipmentPart]: updatedEquipment,
      };
    });
  };

  //當item數量===0, removeItem
  useEffect(() => {
    items.forEach((item) => {
      if (item && item.quantity === 0) {
        removeItem(item.id);
        // console.log("items.length is: ", items.length);
      }
    });
  }, [items, removeItem]); // 當 items變動,removeItem 時觸發

  // 基礎能力 + 裝備能力
  // 使用useCallback來包裝CalculateStats，避免在每次渲染時重新創建函數
  const calculateTotalStats = useCallback(() => {
    // 基礎能力值
    const baseAttack = level * 10;
    const baseDefense = level * 10;
    const baseResistance = level * 5;

    // 裝備加成的能力值
    let equippedAttack = 0;
    let equippedDefense = 0;
    let equippedResistance = 0;
    for (const part of Object.values(equipment)) {
      if (part && part.item) {
        equippedAttack += part.item.atk || 0;
        equippedDefense += part.item.def || 0;
        equippedResistance += part.item.resistance || 0;
      }
    }

    //更新state
    setCurrentStats({
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
    });

    return {
      baseAttack,
      baseDefense,
      baseResistance,
      equippedAttack,
      equippedDefense,
      equippedResistance,
    };
  }, [level, equipment]);

  //當level,equipment有變動,就更新能力值
  useEffect(() => {
    calculateTotalStats();
  }, [level, equipment, calculateTotalStats]);

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
        equipItem,
        sellItem,
        removeItem,
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

        currentStats,
        setCurrentStats,
        calculateTotalStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
