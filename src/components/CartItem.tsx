import dummyPic from "./../assets/img/fuzzy-iphone/dusty-brown/alcantara-backup-tan.jpg";
import cross from "./../assets/img/icons/cross-icon.svg";
import { useState } from "react";

export default function CartItem() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="cartItem">
      <div className="cartItem__picture">
        <img src={dummyPic} alt="" />
      </div>
      <div className="cartItem__details">
        <p className="cartItem__details__title">
          FUZZY IPHONE 14 COVER . DUSTY BLACK
        </p>
        <p className="cartItem__details__type">Title: iPhone 14</p>
        <p className="cartItem__details__price">€72,95</p>
        <div className="cartItem__details__counter">
          <button
            onClick={() => {
              setCounter(counter - 1);
            }}
          >
            <div></div>
          </button>
          <div>
            <p>{counter}</p>
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
        <button>
          {" "}
          <img src={cross} alt="" />
        </button>
      </div>
    </div>
  );
}
