/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import cross from "./../assets/img/icons/cross-icon.svg";
import check from "./../assets/img/icons/bx-check.svg";
import { useState, useEffect } from "react";
import { useQuickAddStore } from "../stores/QuickAdd.store";
import { useCartStore } from "../stores/Cart.store";
import useScrollLock from "../../hooks/useScrollLock";
import data from "./../data/products.json";
import CarouselQuickAdd from "./Carousel-QuickAdd";

import useCart from "./../../hooks/useCart.ts";
import debounce from "../../utils/debounce.ts";
interface types {
  [key: string]: boolean;
}

/**
 *
 * COMPONENT
 *
 */
export default function QuickAdd() {
  /**
   * Hooks
   */
  const { unlockScroll, lockScroll } = useScrollLock();
  const { addItem } = useCart();
  /**
   * States
   */
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIstLoading] = useState(false);
  const [isValided, setIsValided] = useState(false);
  const isOpen = useQuickAddStore((state: any) => state.isOpen);
  const itemId = useQuickAddStore((state: any) => state.itemId);
  const setIsOpen = useQuickAddStore((state: any) => state.setIsOpen);
  const current = useQuickAddStore((state: any) => state.current);
  const setCartOpen = useCartStore((state: any) => state.setIsOpen);
  const item = data.find((item) => {
    return item.id === itemId;
  });
  const [currentVariant, setcurrentVariant] = useState(
    item ? item.variants[0] : null
  );

  const [currentType, setcurrentType] = useState(item ? item?.type[0] : null);

  /**
   * Functions
   */

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(true);
  };
  const isTypeAvailable = (type: string) => {
    if (currentVariant) {
      const types: types = currentVariant.isAvailable;
      return types[type];
    }
  };
  const isCurrentType = (type: string) => {
    if (item) {
      return currentType === type;
    }
  };
  const handleFirstAvailable = () => {
    if (currentVariant) {
      const types: types = currentVariant.isAvailable;
      for (const key in types) {
        if (types[key] === true) return key;
      }
    }
    return "";
  };
  const handleAddCart = () => {
    setIstLoading(true);
    debounce(() => {
      setIstLoading(false);
      setIsValided(true);
      debounce(() => {
        setIsOpen(false);
        setCartOpen(true);
        setIsValided(false);
      }, 500)();
    }, 1000)();

    if (!item || !currentType || !currentVariant) return;
    addItem(item.id, item.price, currentType, currentVariant.variant);
  };

  /**
   * Effects
   */

  useEffect(() => {
    setcurrentVariant(current);
  }, [current]);

  useEffect(() => {
    if (currentVariant) setcurrentType(handleFirstAvailable());
  }, [currentVariant]);

  useEffect(() => {
    if (isOpen === false) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const isLargeButtonClosest = target.closest(
        ".item__picture__second__add--large"
      );
      const isSmallButtonClosest = target.closest(
        ".item__picture__second__add--small"
      );
      const isQuickAddClosest = target.closest(".quickAdd");

      const condition =
        isLargeButtonClosest === null && isSmallButtonClosest === null
          ? isQuickAddClosest === null
            ? true
            : false
          : false;

      if (condition) {
        unlockScroll();
        setIsOpen(false);
      }
    };
    lockScroll();
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen === true]);

  return (
    <>
      <div
        className={`quickAdd__overlay ${
          isOpen ? "quickAdd__overlay--open" : ""
        }  `}
      ></div>
      <div className={`quickAdd ${isOpen ? "quickAdd--open" : ""}  `}>
        <div className="quickAdd__wrapper">
          <div
            className="quickAdd__wrapper__close "
            onClick={() => {
              unlockScroll();
              setIsOpen(false);
            }}
          >
            <img src={cross} alt="" />
          </div>
          <div className="quickAdd__wrapper__picture">
            <CarouselQuickAdd
              items={currentVariant ? currentVariant.photos : []}
            />
          </div>
          <div className="quickAdd__wrapper__form">
            <div className="quickAdd__wrapper__form__options">
              <div className="quickAdd__wrapper__form__options__title">
                <h1>
                  {item?.name}. {currentVariant?.variant}
                </h1>
                <p>€{item?.price}</p>
              </div>
              <div className="quickAdd__wrapper__form__options__variants">
                {item?.variants.map((variant, index) => (
                  <div
                    key={index}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    title={isHover ? item.name + ". " + variant.variant : ""}
                    onClick={() => {
                      setcurrentVariant(variant);
                    }}
                    className={`${
                      variant === currentVariant ? "currentVariant" : ""
                    }`}
                  >
                    <img src={variant.photos[0]} alt="" />
                  </div>
                ))}
              </div>
              <div className="quickAdd__wrapper__form__options__types">
                {item?.type.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setcurrentType(type);
                    }}
                    className={`${
                      isTypeAvailable(type) ? "" : "notAvailable"
                    } ${isCurrentType(type) ? "currentType" : ""}`}
                    disabled={!isTypeAvailable(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p
                className="quickAdd__wrapper__form__options__description"
                dangerouslySetInnerHTML={{
                  __html: item ? item.description : "",
                }}
              />
            </div>
            <div className="quickAdd__wrapper__form__add">
              <button
                className="quickAdd__wrapper__form__add__btn"
                onClick={handleAddCart}
              >
                {isLoading ? (
                  <div className={`loader-wrapper`}>
                    <div className="loader-wrapper__lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : isValided ? (
                  <div className={`loader-wrapper loader-wrapper--isValided`}>
                    <img src={check} alt="" />
                  </div>
                ) : (
                  "add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
