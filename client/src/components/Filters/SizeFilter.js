import React, { useEffect } from "react";
import * as actionTypes from "../../store/actionTypes";
import { filterBySelections } from "../../store/actions";
import { connect } from "react-redux";

const SizeFilter = ({
  storeSelections,
  selections,
  filterBySelections,
  filtered,
  renderedFood,
  foodTypes,
}) => {
  const sizeChanged = (e) => {
    let sizeName = e.target.name;
    storeSelections(sizeName);
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
  }, [selections.sizes]);

  return (
    <div className="ml-4">
      Size:
      <div className="form-check">
        <div>
          <input
            name="big"
            onChange={(e) => sizeChanged(e)}
            defaultChecked
            className="form-check-input"
            type="checkbox"
            value={selections.sizes.big}
            id="defaultCheck1"
          />
          <label className="form-check-label">Big</label>
        </div>
        <div>
          <input
            onChange={(e) => sizeChanged(e)}
            name="medium"
            defaultChecked
            className="form-check-input"
            type="checkbox"
            value={selections.sizes.medium}
            id="defaultCheck1"
          />
          <label className="form-check-label">Medium</label>
        </div>
        <div>
          <input
            onChange={(e) => sizeChanged(e)}
            name="small"
            defaultChecked
            className="form-check-input"
            type="checkbox"
            value={selections.sizes.small}
            id="defaultCheck1"
          />
          <label className="form-check-label">Small</label>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSelections: (sizeName) => {
      dispatch({
        type: actionTypes.FILTER_BY_SIZE,
        payload: sizeName,
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

export default connect(mapStateToProps, mapDispatchToProps)(SizeFilter);
