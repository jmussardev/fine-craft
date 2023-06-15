import fullStar from "./../assets/img/icons/star.svg";
import halfStar from "./../assets/img/icons/star-half.svg";
import emptyStar from "./../assets/img/icons/star-empty.svg";
import { ReviewType } from "./../../config/types";

export default function Stars({
  review,
  avg,
}: {
  review?: ReviewType;
  avg?: number;
}) {
  const rating = review ? review.rating : avg;

  if (!rating) return <></>;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, i) => {
      return <img key={i} src={star} alt="" />;
    });
  };

  return <div className="stars">{renderStars()}</div>;
}
