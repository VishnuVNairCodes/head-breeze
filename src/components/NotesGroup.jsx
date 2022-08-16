import { NoteCard } from "../components";
import "./NotesGroup.css";

const NotesGroup = () => {
  return (
    <section className="notes-group">
      <h2 className="notes-group-heading">Pinned</h2>
      <section className="notes-container">
        <NoteCard />
        <NoteCard />
      </section>
    </section>
  );
};

export { NotesGroup };
