import cross from "./../assets/img/icons/cross-icon.svg";
import { useState, useEffect } from "react";
import { useQuickAddStore } from "../stores/QuickAdd.store";
import useScrollLock from "../../hooks/useScrollLock";
import data from "./../data/products.json";
import Carousel from "./Carousel";
// import DOMPurify from "dompurify";

/**
 *
 * COMPONENT
 *
 */
export default function QuickAdd() {
  /**
   * Hooks
   */
  const { unlockScroll } = useScrollLock();
  /**
   * States
   */
  const [isHover, setIsHover] = useState(false);
  const isOpen = useQuickAddStore((state: any) => state.isOpen);
  const itemId = useQuickAddStore((state: any) => state.itemId);
  const toggleQuickAddDrawer = useQuickAddStore(
    (state: any) => state.toggleQuickAddDrawer
  );
  const item = data.find((item) => {
    return item.id === itemId;
  });
  const [currentVariant, setcurrentVariant] = useState(
    item ? item?.variants[1] : null
  );

  const [currentType, setcurrentType] = useState(item ? item?.type[0] : null);

  /**
   * Functions
   */

  // const sanitizedData = () => ({
  //   __html: DOMPurify.sanitize(item ? item?.description : ""),
  // });
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(true);
  };

  /**
   * Effects
   */
  useEffect(() => {
    console.log(isOpen);
    console.log(item);
    console.log("itemId : " + itemId);
  }, [isOpen, itemId, item]);

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
              toggleQuickAddDrawer();
            }}
          >
            <img src={cross} alt="" />
          </div>
          <div className="quickAdd__wrapper__picture">
            <Carousel items={currentVariant ? currentVariant.photos : []} />
          </div>
          <div className="quickAdd__wrapper__form">
            <div className="quickAdd__wrapper__form__options">
              <div className="quickAdd__wrapper__form__options__title">
                <h1>{item?.name}. dusty black</h1>
                <p>€{item?.price}</p>
              </div>
              <div className="quickAdd__wrapper__form__options__variants">
                {item?.variants.map((variant) => (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    title={isHover ? item.name + ". " + variant.variant : ""}
                    onClick={() => {
                      setcurrentVariant(variant);
                    }}
                  >
                    <img src={variant.photos[0]} alt="" />
                  </div>
                ))}
              </div>
              <div className="quickAdd__wrapper__form__options__types">
                {item?.type.map((type) => (
                  <div>{type}</div>
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
              <button className="quickAdd__wrapper__form__add__btn">
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
