import React, { useEffect } from "react";
import { Nav, Dropdown, Navbar } from "react-bootstrap";
import "../styles/Header.css";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes";
import BasketTable from "./BasketTable";
import axios from "axios";

const Header = ({ basket, storeBasketData }) => {
  useEffect(() => {
    const fetchBasketData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/basket");
        // console.log(result, "ss");

        storeBasketData(result.data);
      } catch (error) {
        // dispatch({ type: "FETCH_FAILURE" });
        console.log(error);
      }
    };
    fetchBasketData();
  }, []);
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand href="/">Food Order</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link className="basket" href="#">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <i className="fas fa-shopping-basket"></i>
              {basket ? (
                <span>{basket.length} Items</span>
              ) : (
                <span>0 Items</span>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <BasketTable></BasketTable>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeBasketData: (data) => {
      dispatch({ type: actionTypes.STORE_BASKET_DATA, payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
