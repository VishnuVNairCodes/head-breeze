import { useEffect, useState } from "react";
import { Header, NavBar } from "../../components";
import { useAuth } from "../../contexts/auth-context";
import { useNavBar } from "../../contexts/nav-context";
import { getUserDetailsService } from "../../services/profile-services/getUserDetailsService";

import "./Profile.css";

const Profile = () => {
  const { showNavBar } = useNavBar();

  const {
    currentAuthInfo: { token },
  } = useAuth();

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await getUserDetailsService(token);
        setUserDetails(user);
      } catch (error) {
        console.error(error);
        //replace this with proper error handling in view
      }
    })();
  }, [token]);
  const { firstName, lastName, notes, archives, trash } = userDetails;

  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-inner">
        {showNavBar && <NavBar />}
        <div className="profile-container">
          <div className="profile">
            <h2>
              Hi! {firstName} {lastName} 👋
            </h2>
            <h3>Welcome to your Head Breeze Profile!</h3>
            <table className="profile-table">
              <tbody className="profile-table-body">
                <tr className="profile-table-row">
                  <th scope="row">Number of Notes</th>
                  <td>{notes?.length}</td>
                </tr>
                <tr className="profile-table-row">
                  <th scope="row">Your Archived Notes</th>
                  <td>{archives?.length}</td>
                </tr>
                <tr className="profile-table-row">
                  <th scope="row">Your Trashed Notes</th>
                  <td>{trash?.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };
