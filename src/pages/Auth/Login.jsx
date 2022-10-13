import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

import "./AuthForm.css";

const Login = () => {
  const loginLocation = useLocation();
  const navigate = useNavigate();

  const { currentAuthInfo, loginHandler } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const guestLoginHandler = () => {
    setUserCredentials((prev) => ({
      email: "vishnuvnair.ui@gmail.com",
      password: "testPassword@123",
    }));
  };

  useEffect(() => {
    if (currentAuthInfo.token) {
      navigate(loginLocation.state?.from?.pathname || "/home", {
        replace: true,
      });
    }
  });

  return (
    <article className="auth-form-container">
      <h1 className="auth-form-heading">Login Page</h1>
      <form
        className="auth-form"
        onSubmit={(e) => loginHandler(e, userCredentials)}
      >
        <label htmlFor="email" className="auth-form-label">
          <p>Email:</p>
          <input
            className="auth-form-input"
            type="email"
            id="email"
            name="email"
            value={userCredentials.email}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="password" className="auth-form-label">
          <p>Password:</p>
          <input
            className="auth-form-input"
            type="password"
            id="password"
            name="password"
            value={userCredentials.password}
            onChange={changeHandler}
          />
        </label>
        <section className="auth-action">
          <button className="btn btn-primary auth-form-btn" type="submit">
            Login
          </button>
          <button
            className="btn btn-primary-outline auth-form-btn"
            onClick={guestLoginHandler}
          >
            Login as Guest
          </button>
          <Link to="/signup" className="btn auth-form-btn auth-form-link">
            Create New Account
          </Link>
        </section>
      </form>
    </article>
  );
};

export { Login };
