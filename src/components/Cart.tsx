/* eslint-disable react-hooks/exhaustive-deps */
import cross from "./../assets/img/icons/cross-icon.svg";
import google from "./../assets/img/icons/gpay.svg";
import shop from "./../assets/img/icons/Shop.svg";
import paypal from "./../assets/img/icons/paypal-logo-svg-vector.svg";
import countries from "./../data/countries.json";
import debounce from "../../utils/debounce";
import { useState, useEffect, useRef } from "react";
import CartItem from "./CartItem";
import { useCartStore } from "./../stores/Cart.store.ts";
import { Content, ItemContainer } from "./../../config/types";
// import { ItemContainer } from "./../../config/types.ts";

/**
 *
 * COMPONENT
 *
 */
export default function Cart({ unlockScroll }: { unlockScroll: () => void }) {
  /**
   * States
   */
  const [fakeShipping, setFakeShipping] = useState(false);
  const [isCalulating, setIsCalulating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const cartContent: ItemContainer[] = useCartStore(
    (state: any) => state.content
  );
  const isDeleting = useCartStore((state: any) => state.isDeleting);
  const isCartOpen = useCartStore((state: any) => state.isOpen);
  const setIsCartOpen = useCartStore((state: any) => state.setIsOpen);

  /**
   * Functions
   */

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartContent) {
      const sum = item.content.price * item.quantity;
      total = total + sum;
    }
    return total.toFixed(2);
  };

  const dummyShipping = () => {
    setFakeShipping(false);
    setIsCalulating(true);

    const delayDummy = debounce(() => {
      setFakeShipping(true);
    }, 1500);
    return delayDummy();
  };

  /**
   * Effects
   */
  useEffect(() => {
    const handleCalculating = () => {
      setIsCalulating(false);
    };
    if (fakeShipping) handleCalculating();
  }, [fakeShipping]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen === false) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const isButtonClosest = target.closest(".header__board__right__cart");
      const isCartClosest = target.closest(".header__cart");

      const condition =
        isButtonClosest === null
          ? isCartClosest === null
            ? true
            : false
          : false;

      if (condition) {
        unlockScroll();
        setIsCartOpen(false);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isCartOpen === true]);

  useEffect(() => {
    const handleDeleting = () => {
      const content = document.querySelector(".header__cart__wrapper__content");
      content?.classList.add("header__cart__wrapper__content--deleting");
    };
    const handleRemoveDeleting = () => {
      const content = document.querySelector(".header__cart__wrapper__content");
      content?.classList.remove("header__cart__wrapper__content--deleting");
    };
    handleDeleting();
    return debounce(handleRemoveDeleting, 2000);
  }, [isDeleting]);

  return (
    <div
      tabIndex={0}
      ref={ref}
      className={`header__cart ${isCartOpen ? "header__cart--open" : ""}  `}
      onBlur={() => {
        setIsCartOpen(false);
      }}
    >
      <div className="header__cart__title">
        <h2>cart</h2>
        <div
          className="header__cart__title__close "
          onClick={() => {
            unlockScroll();
            setIsCartOpen(false);
          }}
        >
          <img src={cross} alt="" />
        </div>
      </div>
      <div className="header__cart__wrapper">
        <div
          className={`header__cart__wrapper__content  `}
          style={
            cartContent.length === 0
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
        >
          {cartContent.length === 0 && (
            <p style={{ textTransform: "initial" }}>Your Cart is Empty</p>
          )}
          {cartContent.length !== 0
            ? cartContent.map((item, index) => (
                <CartItem key={index} cartItem={item} />
              ))
            : ""}
        </div>
        <div
          className="header__cart__wrapper__shipping"
          style={{
            display: `${cartContent.length === 0 ? "none" : ""}`,
          }}
        >
          <div className="header__cart__wrapper__shipping__title">
            <p>Estimate shipping</p>
            <button
              className="header__cart__wrapper__shipping__title__btn"
              onClick={() => {
                setIsFormOpen(!isFormOpen);
              }}
            >
              <div
                className={`header__cart__wrapper__shipping__title__btn__icon ${
                  isFormOpen
                    ? "header__cart__wrapper__shipping__title__btn__icon--open"
                    : ""
                }`}
              >
                <div></div>
              </div>
            </button>
          </div>

          <form
            className={`header__cart__wrapper__shipping__form ${
              isFormOpen ? " header__cart__wrapper__shipping__form--open" : ""
            }   `}
          >
            <div className="header__cart__wrapper__shipping__form__input">
              <label htmlFor="countries">Country/region</label>
              <input list="countries" />
              <datalist id="countries">
                {countries.map((country, index) => (
                  <option key={index} value={country.name} />
                ))}
              </datalist>
            </div>
            <div className="header__cart__wrapper__shipping__form__input">
              <label htmlFor="postCode">Postal code</label>
              <input list="text" id="postCode" />
            </div>
            <div className="header__cart__wrapper__shipping__form__result">
              {fakeShipping ? (
                <p>Standard Shipping (DPD/DHL/UPS) €15,27</p>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                dummyShipping();
              }}
            >
              {isCalulating ? "calculating.." : "calculate shipping"}
            </button>
          </form>
        </div>
        <div
          className="header__cart__wrapper__checkout"
          style={{
            display: `${cartContent.length === 0 ? "none" : ""}`,
          }}
        >
          <div className="header__cart__wrapper__checkout__regular">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "15px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                }}
              >
                subtotal
              </p>
              <p style={{ fontSize: "16px", fontWeight: "bolder" }}>
                €{calculateTotal()} EUR
              </p>
            </div>
            <p
              style={{
                fontSize: "9px",
                textTransform: "none",
                fontStyle: "italic",
                marginBottom: "20px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              esse obcaecati asperiores cum recusandae doloribus quaerat.
              Delectus cumque sint, sed eveniet ipsa error provident.
            </p>
            <button>CHECK OUT</button>
          </div>
          <div className="header__cart__wrapper__checkout__fast">
            <button style={{ backgroundColor: "#5a31f4" }}>
              <img style={{ height: "19px" }} src={shop} alt="" />
            </button>
            <button style={{ backgroundColor: "#ffc439" }}>
              <img style={{ height: "34px" }} src={paypal} alt="" />
            </button>
            <button style={{ backgroundColor: "#000" }}>
              <img style={{ height: "21px" }} src={google} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
