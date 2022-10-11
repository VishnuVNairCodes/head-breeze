import { Header, Main, NavBar } from "../../components";
import { useNavBar } from "../../contexts/nav-context";

const Trash = () => {
  const { showNavBar } = useNavBar();
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-inner">
        {showNavBar && <NavBar />}
        <Main pageName="TRASH" />
      </div>
    </div>
  );
};

export { Trash };
