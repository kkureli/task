import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./PriceFilter.css";
import * as actionTypes from "../../store/actionTypes";
import { filterBySelections } from "../../store/actions";
import { connect } from "react-redux";

const PriceFilter = ({
  storeSelections,
  selections,
  filterBySelections,
  filtered,
  renderedFood,
  foodTypes,
}) => {
  const priceChanged = (e) => {
    let priceType = e.target.name;
    let value = e.target.value;

    storeSelections(priceType, value);
  };

  useEffect(() => {
    if (filtered === true) {
      const saveSelections = async () => {
        try {
          await filterBySelections(selections, renderedFood, foodTypes);
        } catch (error) {
          // dispatch({ type: "FETCH_FAILURE" });
          console.log(error);
        }
      };
      saveSelections();
    }
  }, [selections.priceRange]);

  return (
    <div className="ml-4 d-flex">
      <Form.Group
        className="priceFilter"
        controlId="exampleForm.ControlSelect1"
      >
        <Form.Label>Price(Min):</Form.Label>
        <Form.Control name="min" onChange={priceChanged} as="select">
          <option value="0">$0</option>
          <option value="10">$10</option>
          <option value="15">$15</option>
        </Form.Control>
      </Form.Group>
      <Form.Group
        className="priceFilter ml-3"
        controlId="exampleForm.ControlSelect1"
      >
        <Form.Label>Price(Max):</Form.Label>
        <Form.Control onChange={priceChanged} name="max" as="select">
          <option value="20">$20</option>
          <option value="10">$10</option>
          <option value="5">$5</option>
        </Form.Control>
      </Form.Group>
      {console.log(renderedFood)}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSelections: (priceLimitType, value) => {
      dispatch({
        type: actionTypes.FILTER_BY_PRICE,
        payload: priceLimitType,
        value: value,
      });
    },
    filterBySelections: (selections, renderedFood, foodTypes) =>
      dispatch(filterBySelections(selections, renderedFood, foodTypes)),
  };
};

const mapStateToProps = (state) => {
  return {
    selections: state.selections,
    filtered: state.filtered,
    renderedFood: state.renderedFood,
    foodTypes: state.foodTypes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter);
