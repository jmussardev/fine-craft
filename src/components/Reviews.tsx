import data from "./../data/products.json";
import Review from "./Review";
import { calcAvg } from "./../../utils/calcAvg";
import Stars from "./Stars";
import Masonry from "masonry-layout";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { ReviewsType } from "../../config/types";

export default function Reviews({ reviews }: { reviews: ReviewsType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avg = parseInt(calcAvg(reviews));
  const elem = document.querySelector(".reviews__container") as Element;
  const msnry = new Masonry(elem, {
    itemSelector: ".review",
    columnWidth: ".reviews__container__sizer",
    gutter: 15,
    horizontalOrder: true,
  });

  return (
    <>
      {isModalOpen && <ReviewModal />}
      <div className="reviews">
        <div className="reviews__header">
          <div className="reviews__header__average">
            <div className="reviews__header__average__starts">
              <Stars avg={avg} />
            </div>
            <p>
              &nbsp; {reviews.length} Review{reviews.length > 1 ? "s" : ""}
            </p>
          </div>
          <button className="reviews__header__btn"> Write a review</button>
        </div>
        <div
          className="reviews__container"
          data-masonry='{ "itemSelector": ".review"}'
        >
          <div className="reviews__container__sizer"></div>
          {reviews.map((review, i) => (
            <div key={i}>
              <Review review={review} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
