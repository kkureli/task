import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Categories from "./components/Categories";
import FoodsToList from "./components/FoodsToList";
import ManipulateData from "./components/ManipulateData";

function App() {
  return (
    <div className="App container">
      <Header></Header>
      <Categories></Categories>
      <ManipulateData></ManipulateData>
      <FoodsToList></FoodsToList>
    </div>
  );
}

export default App;
