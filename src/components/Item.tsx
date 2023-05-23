import { useEffect, useRef, useState } from "react";
import arrow from "./../assets/img/icons/arrow.svg";
import add from "./../assets/img/icons/add.svg";
import debounce from "../../utils/debounce";
import { Link } from "react-router-dom";
import observer from "./../../utils/observer";

/**
 * Types
 */
interface variant {
  variant: string;
  photos: string[];
}

/**
 * COMPONENT
 */
export default function Item({
  img,
  secondImg,
  title,
  price,
  variants,
}: {
  img: string;
  secondImg: string;
  title: string;
  price: number;
  variants: variant[];
}) {
  /**
   * States
   */
  const [scrollIpt, setScrollIpt] = useState<number>(0);
  const [isOverflowing, setIsOverflowing] = useState<boolean>();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const [isHover, setIsHover] = useState(false);
  const [current, setCurrent] = useState(variants[0]);
  /**
   * Refs
   */
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<HTMLDivElement>(null);
  // const IsHoverVariant = useRef(false);

  let maxScrollLeft: number | null = null;
  if (scrollRef.current !== null) {
    maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth;
  }
  /**
   * Functions
   */
  const checkOverflow = (el: HTMLDivElement | null) => {
    if (el === null) {
      return null;
    }
    const isOverflowing = el.clientWidth < el.scrollWidth;
    setIsOverflowing(isOverflowing);
  };

  const handleMouseEnter = (variant: variant) => {
    // alert("enter");
    // setIsHover(true);
    // if (variantRef.current) variantRef.current.dataset.isHover = "true";
    setCurrent(variants[variants.indexOf(variant)]);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
    setCurrent(variants[0]);
  };

  /**
   * Effects
   */

  useEffect(() => {
    // if (isHover) alert("enter");
    // console.log("enter");
  }, [isHover]);
  useEffect(() => {
    observer("item__picture__animation", itemRef);
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        width: window.innerWidth,
      });
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    checkOverflow(scrollRef.current);
  }, [dimensions]);

  return (
    <div className="item" ref={itemRef}>
      <div className="item__picture noselect">
        <div className="item__picture__first">
          <img src={current.photos[0]} alt="" />
        </div>
        <Link to={"#"} className="item__picture__second">
          <img src={current.photos[1]} alt="" />
          <div className="item__picture__second__add--small">
            <img src={add} alt="" />
          </div>
          <div className="item__picture__second__add--large">
            <p>quick add</p>
          </div>
        </Link>
      </div>
      <div className="item__infos">
        <p className="item__infos__title">
          {title}.{current.variant}
        </p>
        <p className="item__infos__price">€{price} EUR</p>
        <div className="item__infos__variants">
          <p>{variants.length} colors </p>
          <div
            className="item__infos__variants__grid"
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={scrollRef}
              className="item__infos__variants__grid__scrollbar"
            >
              {variants.map((variant) => (
                <div
                  ref={variantRef}
                  className={`test ${
                    variants.indexOf(variant) === 0 ? "current" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(variant)}
                >
                  <img src={variant.photos[0]} alt="" />
                </div>
              ))}
              {variants.map((variant) => (
                <div
                  ref={variantRef}
                  className={`test ${
                    variants.indexOf(variant) === 0 ? "current" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(variant)}
                >
                  <img src={variant.photos[0]} alt="" />
                </div>
              ))}
            </div>
            <div className="item__infos__variants__grid__actions">
              {isOverflowing ? (
                scrollIpt ? (
                  <button
                    className="item__infos__variants__grid__actions__btn btn--left noselect"
                    onClick={() => {
                      if (scrollRef.current !== null) {
                        scrollRef.current.scrollLeft -= 40;
                        setScrollIpt(scrollRef.current.scrollLeft);
                      }
                    }}
                  >
                    <img src={arrow} alt="" />
                  </button>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}
              {isOverflowing ? (
                maxScrollLeft && maxScrollLeft - 1 <= scrollIpt ? (
                  <div></div>
                ) : (
                  <button
                    className="item__infos__variants__grid__actions__btn btn--right noselect"
                    onClick={() => {
                      if (scrollRef.current !== null) {
                        scrollRef.current.scrollLeft += 40;
                        setScrollIpt(scrollRef.current.scrollLeft);
                      }
                    }}
                  >
                    <img src={arrow} alt="" />
                  </button>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
