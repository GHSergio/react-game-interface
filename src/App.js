import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Homepage, About, Page404, Test, Test2 } from "./pages";
import "./styles/style.scss";
import { GameProvider } from "../src/contexts/GameContext";
import { ModeProvider } from "./contexts/ModeContext";
// import { BackpackProvider } from "./contexts/BackpackContext";

function App() {
  return (
    <BrowserRouter>
      {/* <BackpackProvider> */}
      <GameProvider>
        <ModeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 幾個分頁 */}
              <Route index element={<Homepage />}></Route>
              <Route path="test" element={<Test />}></Route>
              <Route path="test2" element={<Test2 />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="*" element={<Page404 />}></Route>
            </Route>
          </Routes>
        </ModeProvider>
      </GameProvider>
      {/* </BackpackProvider> */}
    </BrowserRouter>
  );
}

export default App;
