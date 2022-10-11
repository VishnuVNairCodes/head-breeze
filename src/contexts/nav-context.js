import { createContext, useContext, useState } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(true);
  return (
    <NavContext.Provider value={{ showNavBar, setShowNavBar }}>
      {children}
    </NavContext.Provider>
  );
};

const useNavBar = () => useContext(NavContext);

export { NavProvider, useNavBar };
