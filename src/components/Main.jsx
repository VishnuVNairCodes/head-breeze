import { NotesGroup } from "../components";
import { useNotes } from "../contexts/notes-context";

import "./Main.css";

const Main = ({ pageName }) => {
  const {
    notesState: { loader },
  } = useNotes();
  return (
    <main className="main">
      <div className="main-inner-container">
        {loader && <p>Loading notes...</p>}
        {!loader && pageName === "home" && (
          <section className="notes-group-container">
            <NotesGroup />
            <NotesGroup />
          </section>
        )}
      </div>
    </main>
  );
};

export { Main };
