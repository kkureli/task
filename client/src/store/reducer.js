import * as actionTypes from "./actionTypes";

const initialState = {
  data: [],
  basket: [],
  totalPrice: 0,
  sortedByType: null,
  sortDirection: null,
  categorized: false,
  selections: {
    sizes: { big: true, medium: true, small: true },
    priceRange: { min: 0, max: 99 },
    selectedType: "All",
  },
  filtered: false,
  renderedFood: null,
  foodTypes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      let foodTypes = action.payload.map((data) => {
        return data.type;
      });

      let uniqueFoodTypes = [...new Set(foodTypes)];

      return {
        ...state,
        foodTypes:
          state.renderedFood === action.food
            ? state.foodTypes
            : action.food === undefined
            ? state.foodTypes
            : uniqueFoodTypes,
        renderedFood: action.food ? action.food : state.renderedFood,
        data: action.payload,
        categorized: action.categorized ? true : false,
        selections: {
          ...state.selections,
          selectedType:
            state.renderedFood === action.food
              ? state.selections.selectedType
              : action.food === undefined
              ? state.selections.selectedType
              : "All",
        },
      };

    case actionTypes.STORE_BASKET_DATA:
      let total = 0;
      action &&
        action.payload.map((item) => {
          return (total = total + item.quantity * item.food_id.price);
        });

      return {
        ...state,
        basket: [...action.payload],
        totalPrice: total,
      };

    case actionTypes.FILTER_BY_SIZE:
      const sizeName = action.payload;
      const updatedSize = {
        [`${sizeName}`]: !state.selections.sizes[sizeName],
      };

      return {
        ...state,
        filtered: true,
        selections: {
          ...state.selections,
          sizes: { ...state.selections.sizes, ...updatedSize },
        },
      };
    case actionTypes.FILTER_BY_TYPE:
      const foodType = action.payload;

      return {
        ...state,
        filtered: true,
        selections: {
          ...state.selections,
          selectedType: foodType,
        },
      };

    case actionTypes.FILTER_BY_PRICE:
      const limitType = action.payload;

      const value = parseInt(action.value);

      const updatedPrice = {
        [`${limitType}`]: value,
      };
      return {
        ...state,
        filtered: true,
        selections: {
          ...state.selections,
          priceRange: {
            ...state.selections.priceRange,
            ...updatedPrice,
          },
        },
      };

    case actionTypes.SORT_BY:
      let sorted = [];
      let direction = "";

      state.sortDirection === "down"
        ? (direction = "up")
        : state.sortDirection === "up"
        ? (direction = "down")
        : (direction = "up");

      if (state.sortedByType === action.payload) {
        sorted = state.data.reverse();
      } else {
        sorted = state.data.sort((a, b) => {
          if (a[action.payload] < b[action.payload]) {
            return -1;
          }
          if (a[action.payload] > b[action.payload]) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        data: [...sorted],
        sortedByType: action.payload,
        sortDirection: direction,
      };

    default:
      return state;
  }
};

export default reducer;
