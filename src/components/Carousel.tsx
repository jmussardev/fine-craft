/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import left from "./../assets/img/icons/bxs-chevron-left.svg";
import right from "./../assets/img/icons/bxs-chevron-right.svg";
import { useCarouselStore } from "../stores/Carousel.store";

export default function Carousel({ items }: { items?: string[] }) {
  const isOpen = useCarouselStore((state: any) => state.isOpen);
  const activeIndex = useCarouselStore((state: any) => state.index);
  const setActiveIndex = useCarouselStore((state: any) => state.setIndex);
  const setIsZooming = useCarouselStore((state: any) => state.setIsZooming);
  const isZooming: boolean = useCarouselStore((state: any) => state.isZooming);

  const updateIndex = (newIndex: number) => {
    if (items && newIndex < 0) {
      newIndex = items.length - 1;
    } else if (items && newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (isZooming === false) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const isLeft = target.closest(".carousel__actions__wrapper__left");
      const isRight = target.closest(".carousel__actions__wrapper__right");

      const condition = isLeft === null && isRight === null ? false : true;

      if (condition) {
        setIsZooming(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isZooming === true]);

  useEffect(() => {
    const wrapper = document.querySelector(".carousel__wrapper");
    const dimension = wrapper?.getBoundingClientRect();
    if (!dimension) return;

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

      <div
        className={` noselect ${
          isOpen ? "carousel carousel--fade" : "carousel"
        }`}
        onClick={() => {
          setIsZooming(!isZooming);
        }}
        style={{ cursor: `${isZooming ? "zoom-out" : "zoom-in"}` }}
      >
        <div
          className={`carousel__wrapper   ${
            isZooming ? "carousel__wrapper--zoom" : ""
          }`}
        >
          <div
            className="carousel__inner"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items &&
              items.map((item, index) => (
                <div
                  className={`carousel__inner__item  ${
                    isZooming ? "carousel__inner__item--zoom" : ""
                  }`}
                  key={index}
                >
                  <img
                    className={`carousel__inner__item__picture ${
                      isZooming ? "carousel__inner__item__picture--zoom" : ""
                    }`}
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
              className="carousel__actions__wrapper__left"
              onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
              <img src={left} alt="" />
            </button>
            <button
              className="carousel__actions__wrapper__right"
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
