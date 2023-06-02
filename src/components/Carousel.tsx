/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import left from "./../assets/img/icons/bxs-chevron-left.svg";
import right from "./../assets/img/icons/bxs-chevron-right.svg";
import { useCarouselStore } from "../stores/Carousel.store";
// import isEqual from "./../../utils/isEqualObject";

// interface dimensions {
//   height: number;
//   width: number;
//   top: number;
//   left: number;
// }

export default function Carousel({ items }: { items?: string[] }) {
  const isOpen = useCarouselStore((state: any) => state.isOpen);
  const activeIndex = useCarouselStore((state: any) => state.index);
  const setActiveIndex = useCarouselStore((state: any) => state.setIndex);
  // const [dimensions, setDimensions] = useState<dimensions | null>(null);

  // const [activeIndex, setActiveIndex] = useState(index ? index : 0);

  const updateIndex = (newIndex: number) => {
    if (items && newIndex < 0) {
      newIndex = items.length - 1;
    } else if (items && newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const wrapper = document.querySelector(".carousel__wrapper");
    const dimension = wrapper?.getBoundingClientRect();
    if (!dimension) return;
    // const dim = {
    //   height: dimension.width,
    //   width: dimension.height,
    //   top: dimension.top,
    //   left: dimension.left,
    // };

    // if (!isEqual(dimension, dim)) {
    //   setDimensions(dim);
    // }

    document.body.style.setProperty(
      "--final-dimension-height",
      `${dimension?.height}px`
    );
    document.body.style.setProperty(
      "--final-dimension-width",
      `${dimension?.width}px`
    );
    document.body.style.setProperty(
      "--final-coordinate-top",
      `${dimension?.top}px`
    );
    document.body.style.setProperty(
      "--final-coordinate-left",
      `${dimension?.left}px`
    );
  });

  return (
    <>
      <div
        className={` ${
          isOpen
            ? "carousel-dummy carousel-dummy--zoomIn"
            : "carousel-dummy carousel-dummy--zoomOut"
        }`}
      >
        <img src={items ? items[activeIndex] : ""} alt="" />
      </div>

      <div className={` ${isOpen ? "carousel carousel--fade" : "carousel"}`}>
        <div className={` carousel__wrapper  }`}>
          <div
            className="carousel__inner"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items &&
              items.map((item, index) => (
                <div className="carousel__inner__item" key={index}>
                  <img
                    className="carousel__inner__item__picture"
                    src={item}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="carousel__actions">
          <div className="carousel__actions__wrapper">
            {" "}
            <button
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <img src={left} alt="" />
            </button>
            <button
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            >
              <img src={right} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
