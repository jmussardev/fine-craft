import { useState, useEffect } from "react";
import left from "./../assets/img/icons/bxs-chevron-left.svg";
import right from "./../assets/img/icons/bxs-chevron-right.svg";

export default function CarouselQuickAdd({ items }: { items?: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (items && newIndex < 0) {
      newIndex = items.length - 1;
    } else if (items && newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);
  return (
    <div className="carousel-quickadd">
      <div
        className="carousel-quickadd__inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items &&
          items.map((item, index) => (
            <div className="carousel-quickadd__inner__item" key={index}>
              <img
                className="carousel-quickadd__inner__item__picture"
                src={item}
                alt=""
              />
            </div>
          ))}
      </div>
      <div className="carousel-quickadd__actions">
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
  );
}
