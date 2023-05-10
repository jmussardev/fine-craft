import { useEffect, useRef, useState } from "react";
import arrow from "./../assets/img/icons/arrow.svg";
import add from "./../assets/img/icons/add.svg";
import debounce from "./../../utils/debounce";
import { Link } from "react-router-dom";

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
  variants: object[];
}) {
  const [scrollIpt, setScrollIpt] = useState<number>(0);
  const [isOverflowing, setIsOverflowing] = useState<boolean>();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  let maxScrollLeft: number | null = null;
  if (scrollRef.current !== null) {
    maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth;
  }

  const checkOverflow = (el: HTMLDivElement | null) => {
    if (el === null) {
      return null;
    }
    const isOverflowing = el.clientWidth < el.scrollWidth;
    setIsOverflowing(isOverflowing);
  };

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
    <div className="item">
      <div className="item__picture noselect">
        <div className="item__picture__first">
          <img src={img} alt="" />
        </div>
        <Link to={"#"} className="item__picture__second">
          <img src={secondImg} alt="" />
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
          {title}.{variants[0].variant}
        </p>
        <p className="item__infos__price">€{price} EUR</p>
        <div className="item__infos__variants">
          {/* <button className="item__infos__variants__btn"></button> */}
          <p>{variants.length} colors </p>
          <div className="item__infos__variants__grid">
            {/* {variants.map((variant) => (
              <img src={variant.photos[0]} alt="" />
            ))} */}
            <div
              ref={scrollRef}
              className="item__infos__variants__grid__scrollbar"
            >
              <div className="test">a</div>
              <div className="test"></div>
              <div className="test"></div>
              <div className="test"></div>
              <div className="test"></div>
              <div className="test">z</div>
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
                maxScrollLeft && maxScrollLeft <= scrollIpt ? (
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
