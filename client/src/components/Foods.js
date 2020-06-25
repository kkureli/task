import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addToBasket } from "../store/actions";
import uuid from "react-uuid";

const Foods = ({ data, addToBasket }) => {
  return (
    data &&
    data.map((food) => {
      return (
        <Col key={uuid()}>
          <Card className="mt-4" style={{ width: "22vw" }}>
            <Card.Img width="20px" variant="top" src={food.image} />
            <Card.Body>
              <Card.Title>
                <b>{food.name}</b>
              </Card.Title>
              <Card.Text>
                Size: <b>{food.size}</b>
              </Card.Text>
              <Card.Text>
                Type: <b>{food.type}</b>
              </Card.Text>
              <Card.Text>
                Price: <b>${food.price}</b>
              </Card.Text>
              <Button onClick={() => addToBasket(food._id)} variant="primary">
                Add to basket!
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToBasket: (foodId) => dispatch(addToBasket(foodId)),
  };
};
export default connect(null, mapDispatchToProps)(Foods);
