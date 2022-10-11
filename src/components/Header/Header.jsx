import { Link } from "react-router-dom";

import "./Header.css";
import { SearchFilterSort } from "../../components";

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-hamburger">
          <button className="btn header-hamburger-btn">
            <i className="bi bi-list"></i>
          </button>
        </div>
        <Link className="header-brand-link" to="/home">
          <span className="color-primary">Head</span>{" "}
          <span className="color-primary-shade">Breeze</span>
        </Link>
      </div>
      <SearchFilterSort />
      <div className="header-contact">
        <a
          href="https://github.com/VishnuVNairCodes"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-github header-contact-link"></i>
        </a>
        <a
          href="https://twitter.com/vishnyou
        "
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-twitter header-contact-link"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/vishnu-v-nair-96178b130/
        "
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-linkedin header-contact-link"></i>
        </a>
      </div>
    </header>
  );
};

export { Header };
