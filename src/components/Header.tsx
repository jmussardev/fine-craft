/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useScrollLock from "./../../hooks/useScrollLock";
import arrow from "./../assets/img/icons/arrow.svg";
import cross from "./../assets/img/icons/cross-icon.svg";
import google from "./../assets/img/icons/gpay.svg";
import shop from "./../assets/img/icons/Shop.svg";
import paypal from "./../assets/img/icons/paypal-logo-svg-vector.svg";

import data from "./../data/drawerLists.json";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
//
export const Header = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [scrollIpt, setScrollIpt] = useState<number>(0);
  const [searchIpt, setSearchIpt] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [secondCategory, setSecondCategory] = useState("");
  const [thirdCategory, setThirdCategory] = useState("");
  const [isSecondary, setIsSecondary] = useState(false);
  const [isTertiary, setIsTertiary] = useState(false);
  const [animate, setAnimate] = useState(true);

  const populateNav = (category: string) => {
    const str = category as keyof typeof data;
    const current: string[] = data[str];

    return (
      <>
        {current.map((item: string, i: number) =>
          item.split("*")[1] === "b" ? (
            <li key={i} className={`${animate ? "animation" : " "}`}>
              <button
                onClick={() => {
                  setThirdCategory(item.split("*")[0]);
                  setIsTertiary(true);
                  setAnimate(false);
                }}
              >
                <span>{item.split("*")[0]}</span>
                <img src={arrow} alt="" />
              </button>
            </li>
          ) : (
            <li key={i} className={`${animate ? "animation" : ""}`}>
              <a href="#">{item}</a>
            </li>
          )
        )}
      </>
    );
  };

  const handleAnimate = () => {
    setAnimate(!animate);
  };

  useEffect(() => {
    console.log(isCartOpen);
  }, [isCartOpen]);
  useEffect(() => {
    handleAnimate();
  }, [isDrawerOpen, isSecondary, isTertiary]);

  useEffect(() => {
    function handleScroll() {
      setScrollIpt(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      <div
        className={`header ${
          scrollIpt > 0 || isDrawerOpen ? "header__board__sticky" : ""
        }`}
      >
        {/* <-- SEARCHBAR -->  */}
        <SearchBar
          searchIpt={searchIpt}
          setSearchIpt={setSearchIpt}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
        {/* <-- SEARCHBAR -->  */}

        {/* <-- HEADER-BOARD -->  */}
        <div className="header__board">
          <div className="header__board__left">
            <div className="header__board__left__menu">
              <button
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => {
                  setIsDrawerOpen(!isDrawerOpen);
                }}
              >
                <div
                  className={`header__board__left__menu__button header__board__left__menu__button${
                    isDrawerOpen ? "--open" : "--close"
                  }`}
                >
                  <div></div>
                </div>
              </button>
            </div>
            <div
              className="header__board__left__search"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsSearchOpen(true);
                lockScroll();
                setIsDrawerOpen(false);
              }}
            >
              <div className="header__board__left__search__button">
                <div></div>
              </div>
            </div>
          </div>
          <div className="header__board__middle">
            <div className="header__board__middle__logo"></div>
          </div>
          <div className="header__board__right">
            <div className="header__board__right__account">
              <div className="header__board__right__account__button ">
                <div></div>
              </div>
            </div>
            <div className="header__board__right__cart">
              <div
                className="header__board__right__cart__button"
                onClick={() => {
                  lockScroll();
                  setIsCartOpen(true);
                }}
              >
                <div
                  className={`header__board__right__cart__button${
                    scrollIpt > 0 || isDrawerOpen ? "--brown" : "--white"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {/* <-- HEADER-BOARD -->  */}

        {/* <-- Menu Nav / Drawer left --> */}
        <div
          className={`header__menuOverlay ${
            isDrawerOpen ? "header__menuOverlay--open" : ""
          } `}
        >
          <div
            className={`header__drawer ${
              isDrawerOpen ? "header__drawer--open" : ""
            }  `}
          >
            <div
              className={`header__drawer__wrapper ${
                isSecondary ? "header__drawer__wrapper--secondary" : ""
              } ${isTertiary ? "header__drawer__wrapper--tertiary" : ""}`}
            >
              <nav className={`header__drawer__primary `}>
                <ul>
                  <li className={`${animate ? "animation" : ""}`}>
                    <a href="#">everything</a>
                  </li>
                  <li className={`${animate ? "animation" : ""}`}>
                    <a href="#">everything vegan v</a>
                  </li>
                  <li className={`${animate ? "animation" : ""}`}>
                    <button
                      onClick={() => {
                        setSecondCategory("devices cases");
                        setIsSecondary(true);
                        setAnimate(false);
                      }}
                    >
                      <span>device cases</span>
                      <img src={arrow} alt="" />
                    </button>
                  </li>
                  <li className={`${animate ? "animation" : ""}`}>
                    <button
                      onClick={() => {
                        setSecondCategory("small goods");
                        setIsSecondary(true);
                        setAnimate(false);
                      }}
                    >
                      <span>small goods</span>
                      <img src={arrow} alt="" />
                    </button>
                  </li>
                  {/* <li>
                  <button
                    onClick={() => {
                      setSecondCategory("bags");
                      setIsSecondary(true);
                    }}
                  >
                    <span>bags</span>
                    <img src={arrow} alt="" />
                  </button>
                </li> */}
                  <li className={`${animate ? "animation" : ""}`}>
                    <button
                      onClick={() => {
                        setSecondCategory("footwear");
                        setIsSecondary(true);
                        setAnimate(false);
                      }}
                    >
                      <span>footwear</span>
                      <img src={arrow} alt="" />
                    </button>
                  </li>
                  <li className={`${animate ? "animation" : ""}`}>
                    <a href="#">watch accessories</a>
                  </li>
                </ul>
              </nav>
              <nav className=" header__drawer__secondary">
                <div className=" header__drawer__secondary__category">
                  <button
                    onClick={() => {
                      setIsSecondary(false);
                      setAnimate(false);
                    }}
                  >
                    <img src={arrow} alt="" />
                  </button>
                  <p>
                    <a href="#">{secondCategory}</a>
                  </p>
                </div>
                <ul>
                  {secondCategory !== "" ? populateNav(secondCategory) : ""}
                </ul>
              </nav>
              <nav className=" header__drawer__tertiary">
                <div className=" header__drawer__tertiary__category">
                  <button
                    onClick={() => {
                      setIsTertiary(false);
                      setAnimate(false);
                    }}
                  >
                    <img src={arrow} alt="" />
                  </button>
                  <p>
                    <a href="#">{thirdCategory}</a>
                  </p>
                </div>
                <ul>
                  {thirdCategory !== "" ? populateNav(thirdCategory) : ""}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* <-- Menu Nav --> */}
        {/* <-- Cart / Drawer right --> */}
        <Cart
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          unlockScroll={unlockScroll}
        />
        {/* <-- Cart / Drawer right --> */}
      </div>
    </>
  );
};
3;
