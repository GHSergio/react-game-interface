import { useEffect } from "react";
import { useGame } from "../contexts/GameContext";
import Swal from "sweetalert2";

//GameContext已經設置每當 equipment變化 就會更新能力值
//其他頁面只需要當 能力值變化 就執行alert即可,
//並且設置在分頁即可,不用設置在多個子元件
//接收currentStats,要使用的每個元件內就不用再接收currentStats
const StatsEffect = () => {
  const { currentStats } = useGame();
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

  useEffect(() => {
    Swal.fire({
      html: `
         <h2>目前能力值:</h2>
          <span>攻擊：${totalAttack}</span>
          <p>  (基礎: ${baseAttack} + 裝備: ${equippedAttack})</p>
          <span>防禦：${totalDefense}</span>
          <p>  (基礎: ${baseDefense} + 裝備: ${equippedDefense})</p>
          <span>抗性：${totalResistance}</span>
          <p>  (基礎: ${baseResistance} + 裝備: ${equippedResistance})</p>
      `,
      showConfirmButton: false,
      width: 500,
      timer: 500,
    });
  }, [
    currentStats,
    baseAttack,
    baseDefense,
    baseResistance,
    equippedAttack,
    equippedDefense,
    equippedResistance,
    totalAttack,
    totalDefense,
    totalResistance,
  ]);

  return null;
};

export default StatsEffect;
