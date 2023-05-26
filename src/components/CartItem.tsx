import cross from "./../assets/img/icons/cross-icon.svg";
import { ItemContainer } from "./../../config/types.ts";
import data from "./../data/products.json";
import useCart from "./../../hooks/useCart.ts";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "./../stores/Cart.store.ts";

export default function CartItem({ cartItem }: { cartItem: ItemContainer }) {
  /**
   * States
   */
  const { removeItem, removeOne, addItem } = useCart();
  const item = data.find((item) => item.id === cartItem.content.id);
  const variant = item
    ? item.variants.find(
        (variant) => variant.variant === cartItem.content.variant
      )
    : null;
  const isDeleting = useCartStore((state: any) => state.isDeleting);
  const setIsDeleting = useCartStore((state: any) => state.setIsDeleting);

  /**
   * Functions
   */
  const handleDeleting = () => {
    setIsDeleting(!isDeleting);
    removeItem(cartItem.content);
    // ref.classList.add("cartItem--deleting");
  };

  return (
    <div className={`cartItem `}>
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
        <p className="cartItem__details__price">€{cartItem.content.price}</p>
        <div className="cartItem__details__counter">
          <button
            onClick={() => {
              removeOne(cartItem);
            }}
          >
            <div></div>
          </button>
          <div>
            <p>{cartItem.quantity}</p>
          </div>
          <button
            onClick={() => {
              const { id, price, type, variant } = cartItem.content;
              addItem(id, price, type, variant);
            }}
          >
            <p>+</p>
          </button>
        </div>
      </div>
      <div className="cartItem__close">
        <button onClick={handleDeleting}>
          <img src={cross} alt="" />
        </button>
      </div>
    </div>
  );
}
