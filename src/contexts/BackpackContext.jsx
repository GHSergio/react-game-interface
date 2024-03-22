// import React, { createContext, useState, useContext } from "react";
// import { useGame } from "./GameContext";

// const BackpackContext = createContext();
// export const useBackpack = () => useContext(BackpackContext);

// export const BackpackProvider = ({ children }) => {
//   const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
//   const [activeItemIndex, setActiveItemIndex] = useState(null);
//   const [isQuantityInputModalOpen, setIsQuantityInputModalOpen] =
//     useState(false);
//   const [quantityInputValue, setQuantityInputValue] = useState(1);
//   const { addItem, items } = useGame();

//   const handleAddItemClick = () => {
//     addItem();
//   };

//   const handleRightClick = (e, index) => {
//     e.preventDefault();
//     setIsMenuModalOpen(true);
//     setActiveItemIndex(index);
//   };

//   const handleCloseContextMenu = () => {
//     setIsMenuModalOpen(false);
//   };

//   const handleItemClick = (action) => {
//     const item = items[activeItemIndex];
//     if (!item) return; // 确保物品存在
//     if (action === "use" && item.quantity > 0) {
//       setIsQuantityInputModalOpen(true);
//     } else if (action === "sell" && item.quantity > 0) {
//       setIsQuantityInputModalOpen(true);
//     } else if (action === "cancel") {
//       setIsQuantityInputModalOpen(false);
//       handleCloseContextMenu();
//     }
//     handleCloseContextMenu();
//   };

//   return (
//     <BackpackContext.Provider
//       value={{
//         isMenuModalOpen,
//         setIsMenuModalOpen,
//         activeItemIndex,
//         setActiveItemIndex,
//         isQuantityInputModalOpen,
//         setIsQuantityInputModalOpen,
//         quantityInputValue,
//         setQuantityInputValue,
//         handleAddItemClick,
//         handleRightClick,
//         handleCloseContextMenu,
//         handleItemClick,
//       }}
//     >
//       {children}
//     </BackpackContext.Provider>
//   );
// };
