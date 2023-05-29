/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Separator from "../components/Separator";
import data from "./../data/products.json";
import infos from "./../data/infos.json";
const firstPhoto = data[0].variants[0].photos[0];
import { useState, useEffect } from "react";
import AddCartBtn from "../components/AddCartBtn";
import shopPay from "./../assets/img/icons/Shop.svg";

export default function Products() {
  const [isOpen0, setIsOpen0] = useState(true);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isCurrent, setIsCurrent] = useState<number | null>(null);

  useEffect(() => {
    const states = [
      { var: isOpen0, func: setIsOpen0 },
      { var: isOpen1, func: setIsOpen1 },
      { var: isOpen2, func: setIsOpen2 },
      { var: isOpen3, func: setIsOpen3 },
      { var: isOpen4, func: setIsOpen4 },
    ];
    for (const state of states) {
      const i = states.indexOf(state);
      if (state.var && i === isCurrent) {
        const i = states.indexOf(state);
        states.splice(i, 1);
        for (const state of states) {
          if (state.var && i + 1 !== isCurrent) {
            state.func(!state.var);
          }
        }
      }
    }
  }, [
    isOpen0 === true,
    isOpen1 === true,
    isOpen2 === true,
    isOpen3 === true,
    isOpen4 === true,
  ]);
  return (
    <div className="container">
      <Header />
      <section className="products-content">
        <div className="products-content__pictures">
          <img src={firstPhoto} alt=""></img>
          <div className="products-content__pictures__other">
            {data[0].variants[0].photos.map((photo, index) => {
              if (index === 0) {
                return "";
              } else {
                return <img key={index} src={photo} alt=""></img>;
              }
            })}
          </div>
        </div>
        <div className="products-content__details">
          <div className="products-content__details__options">
            <div className="products-content__details__options__path">
              <p>Home &bull; Fuzzy iPhone 14 Cover . Dusty Brown </p>
            </div>
            <div className="products-content__details__options__title">
              <h1>Fuzzy iPhone 14 Cover . Dusty Brown </h1>
            </div>
            <div className="products-content__details__options__price">
              <p>€72,95</p>
            </div>
            <div className="products-content__details__options__variants">
              {data[0]?.variants.map((variant, index) => (
                <div
                  key={index}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                  // title={isHover ? item.name + ". " + variant.variant : ""}
                  // onClick={() => {
                  //   setcurrentVariant(variant);
                  // }}
                  // className={`${
                  //   variant === currentVariant ? "currentVariant" : ""
                  // }`}
                >
                  <img src={variant.photos[0]} alt="" />
                </div>
              ))}
            </div>
            <div className="products-content__details__options__types">
              {data[0]?.type.map((type, index) => (
                <button
                  key={index}
                  //   onClick={() => {
                  //     setcurrentType(type);
                  //   }}
                  //   className={`${isTypeAvailable(type) ? "" : "notAvailable"} ${
                  //     isCurrentType(type) ? "currentType" : ""
                  //   }`}
                  //   disabled={!isTypeAvailable(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="products-content__details__options__add">
              <AddCartBtn location={"product"} />
              <button className="products-content__details__options__add__btn">
                <img src={shopPay} alt="" />
              </button>
            </div>
          </div>
          <div className="products-content__details__infos ">
            {infos.map((info, index) => {
              return (
                <div
                  key={index}
                  className="products-content__details__infos__wrapper"
                >
                  <div className="products-content__details__infos__wrapper__title">
                    <p>{info.title}</p>
                    <button
                      className="products-content__details__infos__wrapper__title__btn"
                      onClick={() => {
                        const setIsOpen = eval(" setIsOpen" + index + ";");
                        const isOpen = eval(" isOpen" + index + ";");
                        setIsCurrent(index);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <div
                        className={`products-content__details__infos__wrapper__title__btn__icon ${
                          eval(" isOpen" + index + ";")
                            ? "products-content__details__infos__wrapper__title__btn__icon--open"
                            : ""
                        }`}
                      >
                        <div></div>
                      </div>
                    </button>
                  </div>
                  <div
                    className={`products-content__details__infos__wrapper__content ${
                      eval(" isOpen" + index + ";")
                        ? " products-content__details__infos__wrapper__content--open"
                        : ""
                    }   `}
                    dangerouslySetInnerHTML={{ __html: info.content }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Separator />
      </section>
      <Footer />
    </div>
  );
}
