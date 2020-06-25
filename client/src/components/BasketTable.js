import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import uuid from "react-uuid";
import {
  cleanBasket,
  addToBasket,
  reduceQuantity,
  removeFromBasket,
} from "../store/actions";
import "../styles/BasketTable.css";

const CartTable = ({
  basket,
  cleanBasket,
  totalPrice,
  addToBasket,
  reduceQuantity,
  removeFromBasket,
}) => {
  return basket.length > 0 ? (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Food</th>
            <th>Type</th>
            <th>Size</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {basket &&
            basket.map((item) => {
              return (
                <tr key={uuid()}>
                  <td>
                    {item.quantity}
                    {item.quantity > 1 ? (
                      <i
                        onClick={() => reduceQuantity(item.food_id._id)}
                        className="fas fa-minus ml-2"
                      ></i>
                    ) : null}

                    <i
                      onClick={() => addToBasket(item.food_id._id)}
                      className="fas fa-plus"
                    ></i>
                    <i
                      onClick={() => removeFromBasket(item.food_id._id)}
                      className="fas fa-trash-alt"
                    ></i>
                  </td>
                  <td>{item.food_id.name}</td>
                  <td>{item.food_id.type}</td>
                  <td>{item.food_id.size}</td>
                  <td>${item.food_id.price}</td>
                  <td>${item.quantity * item.food_id.price}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="checkOut">
        <span>
          Total = <b>${totalPrice}</b>
        </span>
        <button
          onClick={cleanBasket}
          type="button"
          className="btn btn-danger mt-3 mb-3 cleanCartBtn"
        >
          Clean Cart
        </button>
        <button
          type="button"
          className="btn btn-success mt-3 ml-3 mb-3 checkOutBtn"
        >
          Check Out
        </button>
      </div>
    </>
  ) : (
    <p>You have no item in your cart !</p>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanBasket: () => dispatch(cleanBasket()),
    addToBasket: (foodId) => dispatch(addToBasket(foodId)),
    reduceQuantity: (foodId) => dispatch(reduceQuantity(foodId)),
    removeFromBasket: (foodId) => dispatch(removeFromBasket(foodId)),
  };
};

const mapStateToProps = (state) => {
  return {
    basket: state.basket,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
