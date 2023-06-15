import { useEffect } from "react";
import { useCarouselStore } from "../stores/Carousel.store";

export default function ProductPreview({
  items,
  setCurrentFirstIndex,
}: {
  items?: string[];
  setCurrentFirstIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const activeIndex = useCarouselStore((state: any) => state.index);
  const setActiveIndex = useCarouselStore((state: any) => state.setIndex);

  useEffect(() => {
    const preview = document.querySelector(
      ".products-content__pictures__preview"
    );
    if (!preview) return;
    preview.scrollLeft = 50 * activeIndex;
  }, [activeIndex]);
  return (
    <div className="product-preview ">
      <div
        className="product-preview__inner"
        // style={{ transform: `translateX(-${activeIndex * 5}%)` }}
      >
        {items &&
          items.map((item, index) => (
            <div className="product-preview__inner__items" key={index}>
              <div
                className={`product-preview__inner__items__container ${
                  activeIndex === index
                    ? "product-preview__inner__items__container--current"
                    : ""
                }`}
              >
                <div
                  className={`product-preview__inner__items__container__wrapper`}
                >
                  <img
                    onClick={() => {
                      setActiveIndex(index);
                      if (setCurrentFirstIndex) setCurrentFirstIndex(index);
                    }}
                    className={`product-preview__inner__items__container__wrapper__picture `}
                    src={item}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
//
