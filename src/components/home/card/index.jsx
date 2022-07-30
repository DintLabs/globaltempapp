import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";

import { storage } from "firebase";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

function Card({ src, title, description, price, id }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    getDownloadURL(refStorage(storage, src.name)).then((url) => {
      setImgSrc(url);
    });
  }, []);
  // {`/products/${id}`}
  return (
    <div className="card">
      {imgSrc && <img src={imgSrc} alt="" />}
      <div className="card__info">
        <h2>
          <Link
            to={
              title == "ISLAND HUT (Kubo) OVERLOOKING - LAKE SIERRA WATERS"
                ? `/products/${id}/booking`
                : `/products/${id}`
            }
          >
            {title}
          </Link>
        </h2>
        <h4>{description}</h4>
        <h3>{price}</h3>
      </div>
    </div>
  );
}

export default Card;
