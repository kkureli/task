import React from "react";
import "../styles/Categories.css";
import { filterFoods } from "../store/actions";
import { connect } from "react-redux";

const Categories = ({ filterFoods }) => {
  return (
    <div className="categories">
      <div onClick={() => filterFoods("Pizza")} className="categorie">
        <h2>Pizzas</h2>
        <img
          width="100%"
          height="100%"
          src="https://www.droetker.com.tr/Recipe/Recipes/droetker.com.tr/tr-tr/baking/image-thumb__25774__RecipeDetail/hizli-mayali-pizza.jpg"
          alt="pizza"
        />
      </div>
      <div onClick={() => filterFoods("Burger")} className="categorie">
        <h2>Burgers</h2>
        <img
          width="100%"
          height="100%"
          src="https://media-cdn.tripadvisor.com/media/photo-s/17/ba/a6/31/burger.jpg"
          alt="burgers"
        />
      </div>
      <div onClick={() => filterFoods("Sushi")} className="categorie">
        <h2>Sushis</h2>
        <img
          width="100%"
          height="100%"
          src="https://media-cdn.tripadvisor.com/media/photo-s/17/5b/c8/d0/shinsen.jpg"
          alt="sushis"
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterFoods: (foodName) => dispatch(filterFoods(foodName)),
  };
};
export default connect(null, mapDispatchToProps)(Categories);
