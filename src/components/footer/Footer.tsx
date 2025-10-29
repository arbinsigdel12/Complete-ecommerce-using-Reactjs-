import "./footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="logo">
          <a
            className="facebook"
            href="https://www.facebook.com/arbin.sigdel.9"
            target="_blank"
          >
            <FaFacebook />
          </a>
          <a
            className="github"
            href="https://github.com/arbinsigdel12"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            className="linkedIn"
            href="https://www.linkedin.com/in/arbin-sigdel12/"
            target="_blank"
          >
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
