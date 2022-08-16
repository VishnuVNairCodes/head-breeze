import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Home,
  Labels,
  Archive,
  Trash,
  Profile,
  Login,
  Signup,
  MockAPI,
} from "./pages";

import { RequiresAuth } from "./RequiresAuth";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route
          path="/labels"
          element={
            <RequiresAuth>
              <Labels />
            </RequiresAuth>
          }
        />
        <Route
          path="/archive"
          element={
            <RequiresAuth>
              <Archive />
            </RequiresAuth>
          }
        />
        <Route
          path="/trash"
          element={
            <RequiresAuth>
              <Trash />
            </RequiresAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
