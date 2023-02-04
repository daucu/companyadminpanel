import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import "../styles/viewproduct.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/productview.css";
function ViewProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  async function getproduct(slug) {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/slug/${slug}`)
      .then((res) => {
        console.log(res.data[0]);
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getproduct(slug);
  }, [slug]);

  return (
    // <div>
    //   <Toolbar variant="dense" sx={{ background: "#333", marginTop: 2 }}>
    //     <Typography
    //       sx={{
    //         color: "white",
    //       }}
    //     >
    //       View Product ( {product.title} )
    //     </Typography>

    //     <Divider sx={{ flexGrow: 1 }} />
    //   </Toolbar>
    //   <div className="maindiv">
    //     <div className="Productcard">
    //       <div className="imageCont">
    //         <img src={product.image} sx={{ width: "100%" }} alt="Item" />
    //       </div>
    //       <div className="infoCont">
    //         <div className="Heading">{product.title}</div>
    //         <div className="text">{product.description}</div>

    //         <div className="info">
    //           <b>Featured:</b> {product.featured}
    //         </div>
    //         <div className="infotext">
    //           <b>Type:</b> {product.type}
    //         </div>
    //         <div className="infotext">
    //           <b>Vendor:</b> {product.vendor}
    //         </div>
    //         <div className="infotext">
    //           <b>Company:</b> {product.company}
    //         </div>
    //         <div className="infotext">
    //           <b>Price:</b> {product.price}
    //         </div>
    //         <div className="infotext">
    //           <b>SalePrice:</b> {product.salePrice}
    //         </div>
    //         <div className="infotext">
    //           <b>Bid Date:</b> {product.bidDate}
    //         </div>
    //         <div className="infotext">
    //           <b>Status:</b> {product.status}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <main>
        <div className="card">
          <div className="card__title">
            <div className="icon">
              <a href="#">
                <i className="fa fa-arrow-left" />
              </a>
            </div>
            <h3>{product.title}</h3>
          </div>
          <div className="card__body">
            <div className="half">
              <div className="featured_text">
                <h1>{product.title}</h1>
                <p className="sub">{product.featured}</p>
              </div>
              <div className="image">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="half">
              <div className="description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  voluptatem nam pariatur voluptate perferendis, asperiores
                  aspernatur! Porro similique consequatur, nobis soluta minima,
                  quasi laboriosam hic cupiditate perferendis esse numquam
                  magni.
                </p>
              </div>
              <div
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
              </div>
              <div className="MainInfo" style={{ marginTop: 20 }}>
                <div className="left-info">Type:</div>
                <div className="right-info"> {product.type}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Vendor:</div>
                <div className="right-info">{product.vendor}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Bid Date:</div>
                <div className="right-info">{product.bidDate}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Featured:</div>
                <div className="right-info">{product.featured}</div>
              </div>
              <div className="MainInfo" style={{ marginTop: 10 }}>
                <div className="left-info">Company:</div>
                <div className="right-info">{product.company}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ViewProduct;
