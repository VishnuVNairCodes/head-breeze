import { NoteCard } from "../../components";
import { useNotes } from "../../contexts/notes-context";
import "./NotesGroup.css";

const NotesGroup = ({ pageName }) => {
  const {
    notesState: { notes, notesArchived, notesTrashed },
  } = useNotes();

  let currentPageNotes;
  switch (pageName) {
    case "HOME":
      currentPageNotes = notes;
      break;
    case "LABELS":
      currentPageNotes = [];
      break;
    case "ARCHIVES":
      currentPageNotes = notesArchived;
      break;
    case "TRASH":
      currentPageNotes = notesTrashed;
      break;
    default:
      throw new Error("Invalid page name");
  }

  return (
    <section className="notes-group">
      {/* <h2 className="notes-group-heading">Pinned</h2> */}
      <section className="notes-container">
        {/* <NoteCard />
        <NoteCard /> */}
        {currentPageNotes.map((currentPageNote) => (
          <NoteCard
            key={currentPageNote._id}
            note={currentPageNote}
            pageName={pageName}
          />
        ))}
      </section>
    </section>
  );
};

export { NotesGroup };