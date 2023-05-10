import { useEffect, useState } from "react";

export const Header = () => {
  const [scrollIpt, setScrollIpt] = useState<number>(0);
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
    <div className={`header ${scrollIpt > 0 ? "header__sticky" : ""}`}>
      <div className="header__left">
        <div className="header__left__menu">
          <div className="header__left__menu__button header__left__menu__button--close">
            <div></div>
          </div>
        </div>
        <div className="header__left__search">
          <div className="header__left__search__button">
            <div></div>
          </div>
        </div>
      </div>
      <div className="header__middle">
        <div className="header__middle__logo"></div>
      </div>
      <div className="header__right">
        <div className="header__right__account">
          <div className="header__right__account__button ">
            <div></div>
          </div>
        </div>
        <div className="header__right__cart">
          <div className="header__right__cart__button">
            <div
              className={`header__right__cart__button${
                scrollIpt > 0 ? "--brown" : "--white"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
