import "./App.css";

import WordManager from "./WordManager";
import TestManager from "./TestManager";
import React, { useState } from "react";

function App() {
  const [screen, setScreen] = useState("home");
  const renderScreen = () => {
    switch (screen) {
      case "wordManager":
        return <WordManager onBack={() => setScreen("home")} />;
      case "testManager":
        return <TestManager onBack={() => setScreen("home")} />;
      default:
        return (
          <div className="home">
            <h1>Title</h1>
            <button
              className="wordManager"
              onClick={() => setScreen("wordManager")}
            >
              단어장
            </button>
            <button
              className="testManager"
              onClick={() => setScreen("testManager")}
              style={{ marginLeft: "10px" }}
            >
              테스트
            </button>
          </div>
        );
    }
  };
  return <div className="App">{renderScreen()}</div>;
}

export default App;
