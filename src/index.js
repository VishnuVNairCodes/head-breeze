import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { NotesProvider } from "./contexts/notes-context";
import { NavProvider } from "./contexts/nav-context";
import { ProfileProvider } from "./contexts/profile-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <NavProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </NavProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
