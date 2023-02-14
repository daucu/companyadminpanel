import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import "../styles/viewproduct.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/productview.css";
function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  async function getproduct(id) {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getproduct(id);
  }, [id]);

  return (
    <>
      <main>
        <div className="card">
          <div className="card__title">
            <div className="icon">
              <a href="#">
                <i className="fa fa-arrow-left" />
              </a>
            </div>
            <h3>{product.name}</h3>
          </div>
          <div className="card__body">
            <div className="half">
              <div className="featured_text">
               
              </div>
              <div className="image">
                <img
                  src={product.gallery}
                  alt=""
                  style={{
                    margin: "auto",
                    width: "70%",
                    height: "70%",
                  }}
                />
              </div>
            </div>
            <div className="half">
              <div className="description">
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <span className="stock">In stock ( {product.status} ) </span>
                <p className="price">
                  (
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationThickness: 1.1,
                      color: "red",
                      fontSize: 18,
                    }}
                  >
                    ${product.price}
                  </span>
                  )
                  <span
                    style={{ color: "green", marginLeft: 20, fontSize: 20 }}
                  >
                    ${product.salePrice}
                  </span>
                </p>
              </div> */}

              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Name:</div>
                <div className="right-info">{product.name}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Description:</div>
                <div className="right-info">{product.description}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Created By:</div>
                <div className="right-info">{product.createdBy}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Created At:</div>
                <div className="right-info">{product.createdAt}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ViewProduct;
