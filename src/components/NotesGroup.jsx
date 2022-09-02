import { NoteCard } from "../components";
import { useNotes } from "../contexts/notes-context";
import "./NotesGroup.css";

const NotesGroup = () => {
  const {
    notesState: { notes },
  } = useNotes();

  return (
    <section className="notes-group">
      {/* <h2 className="notes-group-heading">Pinned</h2> */}
      <section className="notes-container">
        {/* <NoteCard />
        <NoteCard /> */}
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </section>
    </section>
  );
};

export { NotesGroup };
