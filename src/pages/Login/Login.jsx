import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

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

  useEffect(() => {
    if (currentAuthInfo.token) {
      navigate(loginLocation.state?.from?.pathname || "/home", {
        replace: true,
      });
    }
  });

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={(e) => loginHandler(e, userCredentials)}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={userCredentials.email}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            id="password"
            name="password"
            value={userCredentials.password}
            onChange={changeHandler}
          />
          <button type="submit">Login</button>
        </label>
      </form>
    </>
  );
};

export { Login };
