import { useAuth } from "../contexts/auth-context";
import { useNotes } from "../contexts/notes-context";
import { deleteNoteService } from "../services/note-services";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const { notesDispatch } = useNotes();

  const { title, content } = note;

  const editClickHandler = () => {
    notesDispatch({ type: "OPEN_MODAL_NOTE_INPUT_TO_EDIT", payload: note });
  };

  const deleteClickHandler = async () => {
    try {
      const response = await deleteNoteService(note, token);
      console.log(response, "deleted");
      const {
        data: { notes },
        status,
      } = response;
      if (status === 200) {
        notesDispatch({ type: "DELETE_NOTE", payload: notes });
      }
    } catch (error) {
      console.error(error);
      // replace this with proper error handling in view
    }
  };

  return (
    <article className="note-card">
      <section className="note-header">
        <h2 className="note-header-title">{title}</h2>
        <button className="btn note-card-btn">
          <i className="bi bi-pin-fill"></i>
        </button>
      </section>
      <section className="note-content">
        <p>{content}</p>
      </section>
      <section className="note-labels">
        <span className="note-labels-item">Label 1</span>
        <span className="note-labels-item">Label 2</span>
        <span className="note-labels-item">Label 3</span>
      </section>
      <section className="note-footer">
        <p className="note-footer-date">Created on 26/10/2021</p>
        <div className="note-footer-btn-container">
          <button className="btn note-card-btn" onClick={editClickHandler}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-palette"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-tag"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-save"></i>
          </button>
          <button className="btn note-card-btn" onClick={deleteClickHandler}>
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </section>
    </article>
  );
};

export { NoteCard };
