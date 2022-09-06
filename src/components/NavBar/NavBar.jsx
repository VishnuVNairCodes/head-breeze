import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { ModalNoteInput } from "../../components";

import "./NavBar.css";

const NavBar = () => {
  const { logoutHandler } = useAuth();
  const { notesDispatch } = useNotes();

  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--nav-hover)" : "",
  });

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
            <li className="nav-list-item">
              <NavLink
                style={getActiveStyle}
                className="nav-list-item-link"
                to="/labels"
              >
                <i className="bi bi-tags"></i>Labels
              </NavLink>
            </li>
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
            {/* <li className="nav-list-item">
            <NavLink style={getActiveStyle} className="nav-list-item-link" to="/login">
              <i className="bi bi-box-arrow-in-right"></i>Login
            </NavLink>
          </li> */}
          </ul>
        </nav>
        <button
          className="btn btn-primary aside-create-note-btn"
          onClick={() => notesDispatch({ type: "OPEN_MODAL_NOTE_INPUT" })}
        >
          Create New Note
        </button>
        <ModalNoteInput />
      </div>

      <div className="aside-logout-container">
        Adarsh Balika
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
