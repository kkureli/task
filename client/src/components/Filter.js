import React from "react";
import SizeFilter from "./Filters/SizeFilter";
import PriceFilter from "./Filters/PriceFilter";
import TypeFilter from "./Filters/TypeFilter";

const Filter = () => {
  return (
    <div className="mt-3 d-flex">
      <b>Filter: </b>
      <SizeFilter></SizeFilter>
      <PriceFilter></PriceFilter>
      <TypeFilter></TypeFilter>
    </div>
  );
};

export default Filter;
