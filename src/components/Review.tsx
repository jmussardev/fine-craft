import { ReviewType } from "./../../config/types";
import check from "./../assets/img/icons/check-circle.svg";
import Stars from "./Stars";

export default function Review({ review }: { review: ReviewType }) {
  return (
    <div className="review">
      <div className="review__picture">
        <img src={review.photos[0] ? review.photos[0] : ""} alt="" />
      </div>
      <div className="review__details">
        <div className="review__details__name">
          {review.first_name} {review.last_name.split("")[0]}.{" "}
          {review.isVerified ? <img src={check} alt="" /> : ""}
        </div>
        <div className="review__details__stars">
          <Stars review={review} />
        </div>
        <div
          className="review__details__description"
          dangerouslySetInnerHTML={{ __html: review.description }}
        />
        <div className="review__details__item-type">
          <p style={{ fontSize: "10px" }}>item type:</p>
          <p> {review.type}</p>
        </div>
      </div>
    </div>
  );
}
