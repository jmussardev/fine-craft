import { useEffect, useState } from "react";

export const Header = () => {
  const [scrollIpt, setScrollIpt] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    <div
      className={`header ${
        scrollIpt > 0 || isDrawerOpen ? "header__board__sticky" : ""
      }`}
    >
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
          <div className="header__board__left__search">
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
            <div className="header__board__right__cart__button">
              <div
                className={`header__board__right__cart__button${
                  scrollIpt > 0 || isDrawerOpen ? "--brown" : "--white"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* <-- Menu Nav --> */}
      <div
        className={`header__menuOverlay ${
          isDrawerOpen ? "header__menuOverlay--open" : ""
        }`}
      >
        <nav
          className={`header__drawer ${
            isDrawerOpen ? "header__drawer--open" : ""
          }`}
        ></nav>
      </div>
      {/* <-- Menu Nav --> */}
    </div>
  );
};
