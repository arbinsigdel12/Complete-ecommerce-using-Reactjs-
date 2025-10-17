import "./hero.css";
import { BsArrowRightCircle } from "react-icons/bs";
import LandingSvg from "../../../public/assets/Images/hero/landingSVG.svg";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const navigateToAllCategories = () => {
    navigate("/all-categories");
  };
  return (
    <>
      <section>
        <div className="hero">
          <div className="hero-left">
            <h2>Shopping And Department Store</h2>
            <div className="hero-description">
              <p>
                Shopping is a bit of a relaxing hobby for me, which is sometimes
                troubling for the bank balance.
              </p>
            </div>
            <div className="hero-button">
              <button className="learn-more">Learn More</button>
              <button
                className="product-button"
                onClick={navigateToAllCategories}
              >
                Products <BsArrowRightCircle />
              </button>
            </div>
          </div>
          <div className="hero-right">
            <img src={LandingSvg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
