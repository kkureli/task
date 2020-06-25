import axios from "axios";
import { STORE_BASKET_DATA, FETCH_SUCCESS } from "./actionTypes";

export const addToBasket = (foodId) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/addToBasket/" + foodId);
    const result = await axios.get("http://localhost:5000/basket/");

    dispatch({ type: STORE_BASKET_DATA, payload: result.data });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};

export const cleanBasket = () => async (dispatch) => {
  try {
    await axios.delete("http://localhost:5000/cleancart/");
    const result = await axios.get("http://localhost:5000/basket/");
    dispatch({ type: STORE_BASKET_DATA, payload: result.data });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};

export const filterFoods = (food) => async (dispatch) => {
  try {
    const result = await axios.get("http://localhost:5000/foods/" + food);
    dispatch({
      type: FETCH_SUCCESS,
      payload: result.data,
      categorized: true,
      food: food,
    });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};

export const reduceQuantity = (foodId) => async (dispatch) => {
  try {
    await axios.delete("http://localhost:5000/reduceQuantity/" + foodId);
    const result = await axios.get("http://localhost:5000/basket/");
    dispatch({ type: STORE_BASKET_DATA, payload: result.data });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};

export const removeFromBasket = (foodId) => async (dispatch) => {
  try {
    await axios.delete("http://localhost:5000/removeFromBasket/" + foodId);
    const result = await axios.get("http://localhost:5000/basket/");
    dispatch({ type: STORE_BASKET_DATA, payload: result.data });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};

export const filterBySelections = (
  selections,
  renderedFood,
  foodTypes
) => async (dispatch) => {
  try {
    const result = await axios.post("http://localhost:5000/filterdata/", {
      selections: selections,
      renderedFood: renderedFood,
      foodTypes: foodTypes,
    });

    dispatch({ type: FETCH_SUCCESS, payload: result.data });
  } catch (error) {
    // dispatch({ type: "FETCH_FAILURE" });
    console.log(error);
  }
};
