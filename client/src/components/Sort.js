import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes";
import "../styles/Sort.css";

const Sort = ({ sortBy, categorized, sortedByType, sortDirection }) => {
  return (
    <div className="mt-4">
      <b>Sort by:</b>
      <button
        disabled={categorized}
        onClick={() => sortBy("name")}
        type="button"
        className="btn btn-primary ml-3"
      >
        Name
        {sortedByType === "name" && sortDirection === "up" ? (
          <img
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt=""
          />
        ) : sortedByType === "name" && sortDirection === "down" ? (
          <img
            className="downArrowIcon"
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt="arrow1"
          />
        ) : null}
      </button>
      <button
        onClick={() => sortBy("size")}
        type="button"
        className="btn btn-primary ml-2"
      >
        Size
        {sortedByType === "size" && sortDirection === "up" ? (
          <img
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt=""
          />
        ) : sortedByType === "size" && sortDirection === "down" ? (
          <img
            className="downArrowIcon"
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt="arrow1"
          />
        ) : null}
      </button>
      <button
        onClick={() => sortBy("price")}
        type="button"
        className="btn btn-primary ml-2"
      >
        Price
        {sortedByType === "price" && sortDirection === "up" ? (
          <img
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt=""
          />
        ) : sortedByType === "price" && sortDirection === "down" ? (
          <img
            className="downArrowIcon"
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt="arrow1"
          />
        ) : null}
      </button>
      <button
        onClick={() => sortBy("type")}
        type="button"
        className="btn btn-primary ml-2"
      >
        Type
        {sortedByType === "type" && sortDirection === "up" ? (
          <img
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt=""
          />
        ) : sortedByType === "type" && sortDirection === "down" ? (
          <img
            className="downArrowIcon"
            width="15px"
            src={require("../assets/icon_arrow01.svg")}
            alt="arrow1"
          />
        ) : null}
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortBy: (sortType) => {
      dispatch({ type: actionTypes.SORT_BY, payload: sortType });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    categorized: state.categorized,
    sortedByType: state.sortedByType,
    sortDirection: state.sortDirection,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
