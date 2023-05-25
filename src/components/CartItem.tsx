import cross from "./../assets/img/icons/cross-icon.svg";
import { useState } from "react";
import { ItemContainer } from "./../../config/types.ts";
import data from "./../data/products.json";
import useCart from "./../../hooks/useCart.ts";

export default function CartItem({ cartItem }: { cartItem: ItemContainer }) {
  const [counter, setCounter] = useState(0);
  const { removeCart } = useCart();

  const item = data.find((item) => item.id === cartItem.content.id);
  const variant = item
    ? item.variants.find(
        (variant) => variant.variant === cartItem.content.variant
      )
    : null;
  return (
    <div className="cartItem">
      <div className="cartItem__picture">
        <img src={variant?.photos[0]} alt="" />
      </div>
      <div className="cartItem__details">
        <p className="cartItem__details__title">
          {item?.name}. {cartItem.content.variant}
        </p>
        <p className="cartItem__details__type">
          Title: {cartItem.content.type}
        </p>
        <p className="cartItem__details__price">€{item?.price}</p>
        <div className="cartItem__details__counter">
          <button
            onClick={() => {
              setCounter(counter - 1);
            }}
          >
            <div></div>
          </button>
          <div>
            <p>{cartItem.quantity}</p>
          </div>
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            <p>+</p>
          </button>
        </div>
      </div>
      <div className="cartItem__close">
        <button
          onClick={() => {
            removeCart(cartItem.content);
          }}
        >
          <img src={cross} alt="" />
        </button>
      </div>
    </div>
  );
}
