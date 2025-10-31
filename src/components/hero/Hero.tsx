import "./hero.css";
import { BsArrowRightCircle } from "react-icons/bs";
import LandingSvg from "../../../public/assets/Images/hero/landingSVG.svg";
import { Link } from "react-router-dom";

function Hero() {
  return (
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
            <Link to="/products" className="product-button">
              Products <BsArrowRightCircle />
            </Link>
          </div>
        </div>
        <div className="hero-right">
          <img src={LandingSvg} alt="Landing" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
