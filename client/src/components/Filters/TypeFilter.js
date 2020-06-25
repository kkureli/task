import React, { useEffect } from "react";
import * as actionTypes from "../../store/actionTypes";
import { filterBySelections } from "../../store/actions";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";

const TypeFilter = ({
  foodTypes,
  storeSelections,
  renderedFood,
  filterBySelections,
  selections,
  filtered,
}) => {
  const typeSelected = (e) => {
    let selectedType = e.target.value;

    storeSelections(selectedType);
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
  }, [selections.selectedType]);

  {
    return renderedFood ? (
      <div className="ml-4 d-flex">
        <Form.Group
          className="typeFilter"
          controlId="exampleForm.ControlSelect1"
        >
          <Form.Label>Types: </Form.Label>
          <Form.Control onChange={typeSelected} name="foodType" as="select">
            <option>All</option>
            {foodTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group
          className="priceFilter ml-3"
          controlId="exampleForm.ControlSelect1"
        ></Form.Group>
      </div>
    ) : null;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSelections: (selectedType) => {
      dispatch({
        type: actionTypes.FILTER_BY_TYPE,
        payload: selectedType,
      });
    },
    filterBySelections: (selections, renderedFood, foodTypes) =>
      dispatch(filterBySelections(selections, renderedFood, foodTypes)),
  };
};

const mapStateToProps = (state) => {
  return {
    foodTypes: state.foodTypes,
    renderedFood: state.renderedFood,
    selections: state.selections,
    filtered: state.filtered,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeFilter);
