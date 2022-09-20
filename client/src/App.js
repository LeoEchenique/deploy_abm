import React from "react";
import { Routes, Route } from "react-router-dom";
import BeforeHome from "./components/beforeHome/BeforeHome.jsx";
import Home from "./components/_home/Home.jsx";
import NewOperation from "./components/New_Operation/NewOperations.jsx";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route exact path="/" element={<BeforeHome />} />
        <Route exact path="/Home" element={<Home />} />
        <Route
          exact
          path="/Home/Operations/NewOperation/"
          element={<NewOperation />}
        />
        <Route
          exact
          path="/Home/Operations/NewOperation/:id"
          element={<NewOperation />}
        />
      </Routes>
    </div>
  );
}

export default App;
