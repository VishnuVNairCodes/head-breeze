import { Header, NavBar } from "../../components";
import { useNavBar } from "../../contexts/nav-context";

const Profile = () => {
  const { showNavBar } = useNavBar();
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-inner">
        {showNavBar && <NavBar />}
        <h2>Profile</h2>
      </div>
    </div>
  );
};

export { Profile };
