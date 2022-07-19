import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function Card({ src, title, description, price, id }) {
  return (
    <div className="card">
      <img src={src} alt="" />
      <div className="card__info">
        <h2>
          <Link to={`/products/${id}`}>{title}</Link>
        </h2>
        <h4>{description}</h4>
        <h3>{price}</h3>
      </div>
    </div>
  );
}

export default Card;
