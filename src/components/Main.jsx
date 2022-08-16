import "./Main.css";
import { NotesGroup } from "../components";

const Main = () => {
  return (
    <main className="main">
      <div className="main-inner-container">
        <section className="notes-group-container">
          <NotesGroup />
          <NotesGroup />
        </section>
      </div>
    </main>
  );
};

export { Main };
