import { useState } from "react";
import "./App.css";
import Row from "./components/Row";
import categories from "./api";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      {categories.map((category) => (
        <>
          <Row key={category.name} title={category.title} path={category.path} isLarge={category.isLarge}/>
        </>
      ))}
    </div>
  );
}

export default App;
