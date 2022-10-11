import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

import "./AuthForm.css";

const Signup = () => {
  const signupLocation = useLocation();
  const navigate = useNavigate();

  const { currentAuthInfo, signupHandler } = useAuth();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (currentAuthInfo.token) {
      navigate(signupLocation.state?.from?.pathname || "/home", {
        replace: true,
      });
    }
  });

  return (
    <article className="auth-form-container">
      <h1 className="auth-form-heading">Signup Page</h1>
      <form
        className="auth-form"
        onSubmit={(e) => signupHandler(e, userCredentials)}
      >
        <label htmlFor="first-name" className="auth-form-label">
          <p>First Name:</p>
          <input
            className="auth-form-input"
            type="text"
            id="first-name"
            name="firstName"
            value={userCredentials.firstName}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="last-name" className="auth-form-label">
          <p>Last Name:</p>
          <input
            className="auth-form-input"
            type="text"
            id="last-name"
            name="lastName"
            value={userCredentials.lastName}
            onChange={changeHandler}
          />
        </label>
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

        <button className="btn btn-primary auth-form-btn" type="submit">
          Signup
        </button>
      </form>
    </article>
  );
};

export { Signup };
