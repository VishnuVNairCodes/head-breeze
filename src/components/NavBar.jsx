import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

import "./NavBar.css";

const NavBar = () => {
  const { logoutHandler } = useAuth();
  return (
    <>
      <NavLink to="/home">Home</NavLink>||
      <NavLink to="/labels">Labels</NavLink>||
      <NavLink to="/archive">Archive</NavLink>||
      <NavLink to="/trash">Trash</NavLink>||
      <NavLink to="/profile">Profile</NavLink>||
      <NavLink to="/login">Login</NavLink>||
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export { NavBar };
