import { Header, NavBar } from "../../components";
import { useNavBar } from "../../contexts/nav-context";

import "./Profile.css";

const Profile = () => {
  const { showNavBar } = useNavBar();
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-inner">
        {showNavBar && <NavBar />}
        <div className="profile-container">
          <h2>Hi! Vishnu V Nair 👋</h2>
          <h3>Welcome to your Head Breeze Profile!</h3>
          <table className="profile-table">
            <tbody className="profile-table-body">
              <tr className="profile-table-row">
                <th scope="row">Number of Notes</th>
                <td>2</td>
              </tr>
              <tr className="profile-table-row">
                <th scope="row">Your Archived Notes</th>
                <td>2</td>
              </tr>
              <tr className="profile-table-row">
                <th scope="row">Your Deleted Notes</th>
                <td>2</td>
              </tr>
              <tr className="profile-table-row">
                <th scope="row">Your Labels</th>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { Profile };
