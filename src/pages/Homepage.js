import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axiox from "axios";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { ItemList } from "../components/ItemList";

export const Homepage = () => {
  const [itemsData, setItemsData] = useState();
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "rice",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
    },
    {
      name: "noodles",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axiox.get(
          "https://pos-ivory-eight.vercel.app/api/items/get-item"
        );
        setItemsData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);
  return (
    <DefaultLayout>
      <div className="d-flex">
        {categories.map((category) => (
          <div
            className={`d-flex category ${
              selecedCategory === category.name && "category-active "
            }`}
            onClick={() => setSelecedCategory(category.name)}
            key={category.name}
          >
            <h4>{category.name}</h4>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <div className="row"></div>
      <Row>
        {itemsData
          ?.filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};
