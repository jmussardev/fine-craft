import cross from "./../assets/img/icons/cross-icon.svg";
import google from "./../assets/img/icons/gpay.svg";
import shop from "./../assets/img/icons/Shop.svg";
import paypal from "./../assets/img/icons/paypal-logo-svg-vector.svg";
import countries from "./../data/countries.json";
import debounce from "../../utils/debounce";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";

export default function Cart({
  isCartOpen,
  unlockScroll,
  setIsCartOpen,
}: {
  isCartOpen: boolean;
  unlockScroll: () => void;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [fakeShipping, setFakeShipping] = useState(false);
  const [isCalulating, setIsCalulating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dummyShipping = () => {
    setFakeShipping(false);
    setIsCalulating(true);

    const delayDummy = debounce(() => {
      setFakeShipping(true);
    }, 1500);
    // setFakeShipping(false);
    return delayDummy();
  };

  useEffect(() => {
    const handleCalculating = () => {
      setIsCalulating(false);
    };
    if (fakeShipping) handleCalculating();
  }, [fakeShipping]);

  return (
    <div className={`header__cart ${isCartOpen ? "header__cart--open" : ""}  `}>
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
        <div className="header__cart__wrapper__content">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="header__cart__wrapper__shipping">
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
                {countries.map((country) => (
                  <option value={country.name} />
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
        <div className="header__cart__wrapper__checkout">
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
                €330,65 EUR
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
