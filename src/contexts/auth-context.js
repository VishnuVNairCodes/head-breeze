import { createContext, useContext, useState } from "react";
import { loginService, signupService } from "../services/auth-services";

const AuthContext = createContext({ isAuth: false });

const AuthProvider = ({ children }) => {
  const getCurrentAuthInfo = () => {
    if (localStorage.getItem("token") === null) {
      return {
        currentUser: {},
        token: "",
        authError: "",
      };
    }
    return {
      currentUser: JSON.parse(localStorage.getItem("currentUser")),
      token: localStorage.getItem("token"),
      authError: "",
    };
  };

  const [currentAuthInfo, setCurrentAuthInfo] = useState(getCurrentAuthInfo());

  const loginHandler = async (e, userCredentials) => {
    e.preventDefault();
    const { email, password } = userCredentials;
    const response = await loginService(email, password);
    try {
      if (response.status === 200) {
        const { foundUser, encodedToken } = response.data;
        setCurrentAuthInfo((prev) => ({
          ...prev,
          currentUser: foundUser,
          token: encodedToken,
        }));
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        localStorage.setItem("token", encodedToken);
      }
    } catch (err) {
      setCurrentAuthInfo((prev) => ({
        ...prev,
        authError: err.response.data.errors[0],
      }));
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setCurrentAuthInfo((prev) => ({
      ...prev,
      currentUser: {},
      token: "",
      authError: "",
    }));
  };

  const signupHandler = async (e, userCredentials) => {
    e.preventDefault();
    const { email, password, firstName, lastName } = userCredentials;
    const response = await signupService(email, password, firstName, lastName);
    try {
      if (response.status === 201) {
        const { createdUser, encodedToken } = response.data;
        setCurrentAuthInfo((prev) => ({
          ...prev,
          currentUser: createdUser,
          token: encodedToken,
        }));
        localStorage.setItem("currentUser", JSON.stringify(createdUser));
        localStorage.setItem("token", encodedToken);
      }
    } catch (err) {
      setCurrentAuthInfo((prev) => ({
        ...prev,
        authError: err.response.data.errors[0],
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentAuthInfo, loginHandler, logoutHandler, signupHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
