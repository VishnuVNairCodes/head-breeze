import { Header, Main, NavBar } from "../components";

const Home = () => {
  return (
    <div className="app-layout">
      <Header />
      <NavBar />
      <Main pageName="HOME" />
    </div>
  );
};

export { Home };
