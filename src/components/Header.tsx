export const Header = () => {
  return (
    <div className="header">
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
