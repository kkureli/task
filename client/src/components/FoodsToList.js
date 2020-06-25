import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes";
import Foods from "./Foods";
import "../styles/FoodsToList.css";
import { Row, Container } from "react-bootstrap";

const FoodsToList = ({ storeData, data }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/foods");
        storeData(result.data);
      } catch (error) {
        // dispatch({ type: "FETCH_FAILURE" });
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="foodsToList">
      <Container>
        <Row xs="3" sm="3" md="3" lg="3">
          <Foods data={data}></Foods>
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data) => {
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsToList);
