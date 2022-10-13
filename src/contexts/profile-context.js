import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetailsService } from "../services/profile-services";
import { useAuth } from "./auth-context";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

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
    <ProfileContext.Provider value={{ userName, setUserName }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = () => useContext(ProfileContext);

export { ProfileProvider, useProfile };
