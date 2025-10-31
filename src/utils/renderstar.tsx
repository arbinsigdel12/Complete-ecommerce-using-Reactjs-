import { FaRegStar, FaStar } from "react-icons/fa";

export const renderStars = (rating: number) => {
  const stars = [];
  const rounded = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rounded ? <FaStar key={i} /> : <FaRegStar key={i} />);
  }
  return stars;
};
