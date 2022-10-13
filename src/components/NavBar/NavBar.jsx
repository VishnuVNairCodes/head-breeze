import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { ModalNoteInput } from "../../components";
import { getUserDetailsService } from "../../services/profile-services";

import "./NavBar.css";
import { useEffect, useState } from "react";

const NavBar = () => {
  const {
    currentAuthInfo: { token },
    logoutHandler,
  } = useAuth();
  const { notesDispatch } = useNotes();

  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--nav-hover)" : "",
  });

  const [userName, setUserName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await getUserDetailsService(token);
        setUserName(`${user.firstName} ${user.lastName}`);
      } catch (error) {
        console.error(error);
        //replace this with proper error handling in view
      }
    })();
  }, [token]);

  return (
    <aside className="aside">
      <div className="aside-action">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/home"
              >
                <i className="bi bi-house-door"></i>Home
              </NavLink>
            </li>
            {/* <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/labels"
              >
                <i className="bi bi-tags"></i>Labels
              </NavLink>
            </li> */}
            <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/archive"
              >
                <i className="bi bi-archive"></i>Archives
              </NavLink>
            </li>
            <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/trash"
              >
                <i className="bi bi-trash"></i>Trash
              </NavLink>
            </li>
            <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/profile"
              >
                <i className="bi bi-person"></i>Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="aside-create-container">
          {/* <button className="btn btn-primary-outline aside-create-btn">
            Create New Label
          </button> */}
          <button
            className="btn btn-primary aside-create-btn"
            onClick={() => notesDispatch({ type: "OPEN_MODAL_NOTE_INPUT" })}
          >
            Create New Note
          </button>
        </div>
        <ModalNoteInput />
      </div>

      <div className="aside-logout-container">
        {userName}
        <button
          className="btn aside-logout-container-btn"
          onClick={logoutHandler}
        >
          <i className="bi bi-box-arrow-in-right"></i>
        </button>
      </div>
    </aside>
  );
};

export { NavBar };
