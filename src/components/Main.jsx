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
        {!loader && (
          <section className="notes-group-container">
            <NotesGroup pageName={pageName} />
            {/* <NotesGroup /> */}
          </section>
        )}
      </div>
    </main>
  );
};

export { Main };
