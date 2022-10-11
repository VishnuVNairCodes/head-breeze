import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <header className="landing-header">
        <div className="hero">
          <h1 className="hero-heading">
            <span className="color-primary">Head</span>{" "}
            <span className="color-primary-shade">Breeze</span>
          </h1>
          <div className="hero-description-container">
            <div className="hero-description">
              <div className="hero-description-heading">
                <p className="color-primary-shade">Meet your modern </p>
                <p className="color-primary">Note Taking App</p>
              </div>
              <p className="hero-description-text">
                Manage your daily tasks and workflow in a modern way and boost
                your efficiency with ease
              </p>
            </div>
          </div>
          <div className="hero-action">
            <Link
              to="/signup"
              className="btn btn-primary hero-btn-primary landing-link"
            >
              Join Now
            </Link>
            <Link to="/login" className="btn hero-btn-secondary landing-link">
              Already have an account?
            </Link>
          </div>

          <div className="hero-img-container">
            <img
              className="hero-img"
              src={require("../../assets/images/note-taking.svg").default}
              alt="note taking"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export { LandingPage };
