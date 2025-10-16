import "./footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="logo">
          <a className="facebook" href="">
            <FaFacebook />
          </a>
          <a className="github" href="">
            <FaGithub />
          </a>
          <a className="linkedIn" href="">
            <FaLinkedin />
          </a>
        </div>
        <div className="right-reserved">
          © 2025 ClickCart. All rights reserved.
        </div>
        <div className="with-care">Designed and developed with Love.</div>
        <div className="dev-name">Arbin Sigdel</div>
      </div>
    </>
  );
}

export default Footer;
