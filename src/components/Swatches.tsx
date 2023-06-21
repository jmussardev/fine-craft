import data from "./../data/products.json";
import { useState } from "react";
import { ItemVariant, Item } from "../../config/types";
import { Link } from "react-router-dom";

export default function Swatches({
  id,
  currentVariant,
}: {
  id?: string;
  currentVariant?: ItemVariant;
}) {
  const [isHover, setIsHover] = useState(false);
  const item = data.find((item: Item) => {
    return item.id === id;
  });

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(true);
  };
  return (
    <>
      {data[0]?.variants.map((variant, index) => (
        <Link key={index} to={`/products/${id}/${variant.variant}`}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            title={isHover ? item?.name + ". " + variant.variant : ""}
            className={`${variant === currentVariant ? "currentVariant" : ""}`}
            style={{ marginRight: "10px" }}
          >
            <img src={variant.photos[0]} alt="" />
          </div>
        </Link>
      ))}
    </>
  );
}
