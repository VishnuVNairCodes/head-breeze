import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";

const Signup = () => {
  const { signupHandler } = useAuth();

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

  return (
    <>
      <h1>Signup Page</h1>
      <form onSubmit={(e) => signupHandler(e, userCredentials)}>
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
        </label>
        <label htmlFor="first-name">
          First Name:
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={userCredentials.firstName}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="last-name">
          Last Name:
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={userCredentials.lastName}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

export { Signup };
