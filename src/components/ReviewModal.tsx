import cross from "./../assets/img/icons/cross.svg";
import { ReviewType } from "./../../config/types";
import useScrollLock from "../../hooks/useScrollLock";
import Stars from "./Stars";
import check from "./../assets/img/icons/check-circle.svg";
import info from "./../assets/img/icons/info-circle.svg";
import { useState } from "react";

export default function ReviewModal({
  review,
  setIsModalOpen,
}: {
  review: ReviewType | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { unlockScroll } = useScrollLock();
  const [isOpen, setIsOpen] = useState(false);
  if (!review) return <></>;
  return (
    <div className="review-modal">
      <div
        className={`review-modal__modal${
          review.photos.length > 0 ? "" : "--noPicture"
        }`}
      >
        <button
          className={`review-modal__modal${
            review.photos.length > 0 ? "" : "--noPicture"
          }__close`}
          onClick={() => {
            setIsModalOpen(false);
            unlockScroll();
          }}
        >
          <img src={cross} alt="" />
        </button>
        <div
          className={`review-modal__modal${
            review.photos.length > 0 ? "" : "--noPicture"
          }__picture`}
        >
          <img src={review?.photos[0]} alt="" />
        </div>
        <div
          className={`review-modal__modal${
            review.photos.length > 0 ? "" : "--noPicture"
          }__details`}
        >
          {review?.isVerified && (
            <div className="review-modal__modal__details__verified">
              <div className="review-modal__modal__details__verified__icon">
                <img src={check} alt="" /> Verified purchase
              </div>

              <button
                className="review-modal__modal__details__verified__infos-btn"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img src={info} alt="" />{" "}
              </button>
            </div>
          )}
          {isOpen && (
            <div className="review-modal__modal__details__infos">
              This review was collected from a verified customer who purchased
              this item.
            </div>
          )}

          <div className="review-modal__modal__details__name">
            {review?.first_name} {review?.last_name.split("")[0]}.{" "}
          </div>
          <div className="review-modal__modal__details__stars">
            <Stars review={review} />
          </div>
          <div
            className="review-modal__modal__details__description"
            dangerouslySetInnerHTML={{
              __html: review ? review.description : "",
            }}
          />
          <div className="review-modal__modal__details__item-type">
            <p style={{ fontSize: "10px", color: "#b9b9b9" }}>Item type:</p>
            <p style={{ marginBottom: "20px" }}> {review?.type}</p>
          </div>
          <p style={{ fontSize: "10px", color: "#b9b9b9" }}>
            Happy with the shopping and shipping ?
          </p>
          <p style={{ marginBottom: "20px" }}>{review?.experience.shipping}</p>
          <p style={{ fontSize: "10px", color: "#b9b9b9" }}>
            Happy with the product ?
          </p>
          <p>{review?.experience.product}</p>
        </div>
      </div>
    </div>
  );
}
