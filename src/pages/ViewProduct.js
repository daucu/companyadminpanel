import { Divider, IconButton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
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
    <div>
      <Toolbar variant="dense" sx={{ background: "#333", marginTop: 2 }}>
        <Typography
          sx={{
            color: "white",
          }}
        >
          View Product ( {product.title} )
        </Typography>

        <Divider sx={{ flexGrow: 1 }} />
      </Toolbar>
      <div className="maindiv">
        <div className="Productcard">
          <div className="imageCont">
            <img src={product.image} sx={{ width: "100%" }} alt="Item" />
          </div>
          <div className="infoCont">
            <div className="Heading">{product.title}</div>
            <div className="text">{product.description}</div>

            <div className="info">
              <b>Featured:</b> {product.featured}
            </div>
            <div className="infotext">
              <b>Type:</b> {product.type}
            </div>
            <div className="infotext">
              <b>Vendor:</b> {product.vendor}
            </div>
            <div className="infotext">
              <b>Company:</b> {product.company}
            </div>
            <div className="infotext">
              <b>Price:</b> {product.price}
            </div>
            <div className="infotext">
              <b>SalePrice:</b> {product.salePrice}
            </div>
            <div className="infotext">
              <b>Bid Date:</b> {product.bidDate}
            </div>
            <div className="infotext">
              <b>Status:</b> {product.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
