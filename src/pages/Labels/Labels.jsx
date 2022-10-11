import { Header, Main, NavBar } from "../../components";
import { useNavBar } from "../../contexts/nav-context";

const Labels = () => {
  const { showNavBar } = useNavBar();
  return (
    <div className="app-layout">
      <Header />
      <div className="app-layout-inner">
        {showNavBar && <NavBar />}
        <Main pageName="LABELS" />
      </div>
    </div>
  );
};

export { Labels };
