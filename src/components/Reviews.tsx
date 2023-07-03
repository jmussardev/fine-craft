/* eslint-disable @typescript-eslint/no-unused-vars */
import Review from "./Review";
import { calcAvg } from "./../../utils/calcAvg";
import Stars from "./Stars";
import Masonry from "masonry-layout";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { ReviewsType, ReviewType } from "../../config/types";
import ReviewForm from "./ReviewForm";
import useScrollLock from "../../hooks/useScrollLock";

export default function Reviews({ reviews }: { reviews: ReviewsType }) {
  const { lockScroll } = useScrollLock();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewType | null>(null);
  const avg = parseInt(calcAvg(reviews));
  const elem = document.querySelector(".reviews__container") as Element;
  new Masonry(elem, {
    itemSelector: ".review",
    columnWidth: ".reviews__container__sizer",
    gutter: 15,
    horizontalOrder: true,
  });

  return (
    <>
      {isModalOpen && (
        <ReviewModal review={currentReview} setIsModalOpen={setIsModalOpen} />
      )}
      {isFormOpen && <ReviewForm setIsFormOpen={setIsFormOpen} />}
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
          <button
            className="reviews__header__btn"
            onClick={() => {
              setIsFormOpen(true);
              lockScroll();
            }}
          >
            Write a review
          </button>
        </div>
        <div
          className="reviews__container"
          data-masonry='{ "itemSelector": ".review"}'
        >
          <div className="reviews__container__sizer"></div>
          {reviews.map((review, i) => (
            <div key={i}>
              <Review
                review={review}
                setCurrentReview={setCurrentReview}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
