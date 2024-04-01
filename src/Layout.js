import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";
import { useMode } from "./contexts/ModeContext";
import "./styles/style.scss";

const Layout = () => {
  const { mode, setMode } = useMode();
  const [activeIndex, setActiveIndex] = useState(null);
  //toggleMode
  const toggleMode = () => {
    setMode(!mode);
    document.body.setAttribute("data-theme", !mode ? "dark" : "light");
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li
            className={activeIndex === 0 ? "active-li" : ""}
            onClick={() => handleItemClick(0)}
          >
            <Link to="/">首頁</Link>
          </li>
          <li
            className={activeIndex === 1 ? "active-li" : ""}
            onClick={() => handleItemClick(1)}
          >
            <Link to="/Test">主畫面</Link>
          </li>
          <li
            className={activeIndex === 2 ? "active-li" : ""}
            onClick={() => handleItemClick(2)}
          >
            <Link to="/Test2">鐵匠舖</Link>
          </li>
          <li
            className={activeIndex === 4 ? "active-li" : ""}
            onClick={() => handleItemClick(4)}
          >
            <Link to="/About">關於這個網站</Link>
          </li>
          {/* button 添加toggleMode event */}
          <button
            style={{
              marginTop: "4px",
              height: "45px",
              boxShadow: "0 0 2px 2px rgba(0,0,0,0.8)",
            }}
            onClick={toggleMode}
          >
            黑夜模式
          </button>
        </ul>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
