import React from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
const { Meta } = Card;

export const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 },
    });
  };
  return (
    <div>
      <Card
        style={{ width: 240, marginBottom: 20 }}
        cover={<img alt="example" src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div className="item-button">
          <Button
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to cart
          </Button>
        </div>
      </Card>
    </div>
  );
};
