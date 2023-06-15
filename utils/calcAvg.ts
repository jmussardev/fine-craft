import { ReviewsType } from "./../config/types";

export const calcAvg = (reviews: ReviewsType) => {
  const ratings = reviews.map((review) => review.rating);
  const sum = ratings.reduce((a, b) => a + b, 0);
  return (sum / ratings.length || 0).toFixed(1);
};
