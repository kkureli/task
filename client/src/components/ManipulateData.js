import React from "react";
import Sort from "./Sort";
import Filter from "./Filter";
import "../styles/Manipulate.css";

const ManipulateData = () => {
  return (
    <div className="manipulateData">
      <Sort></Sort>
      <Filter></Filter>
    </div>
  );
};

export default ManipulateData;
