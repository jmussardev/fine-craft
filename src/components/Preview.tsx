import { useEffect } from "react";
import { useCarouselStore } from "../stores/Carousel.store";

export default function Preview({ items }: { items?: string[] }) {
  const activeIndex = useCarouselStore((state: any) => state.index);
  const setActiveIndex = useCarouselStore((state: any) => state.setIndex);

  useEffect(() => {
    const preview = document.querySelector(".products-carousel__preview");
    if (!preview) return;
    preview.scrollLeft = 50 * activeIndex;
  }, [activeIndex]);
  return (
    <div className="preview">
      <div
        className="preview__inner"
        // style={{ transform: `translateX(-${activeIndex * 5}%)` }}
      >
        {items &&
          items.map((item, index) => (
            <div className="preview__inner__items" key={index}>
              <img
                onClick={() => {
                  setActiveIndex(index);
                }}
                className={`preview__inner__items__picture ${
                  activeIndex === index
                    ? "preview__inner__items__picture--current"
                    : ""
                }`}
                src={item}
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
}
//
