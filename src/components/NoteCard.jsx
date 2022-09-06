import { useAuth } from "../contexts/auth-context";
import { useNotes } from "../contexts/notes-context";
import { addToArchivesService } from "../services/archive-services/addToArchivesService";
import { deleteNoteService } from "../services/note-services";
import { addToTrashService } from "../services/trash-services/addToTrashService";
import "./NoteCard.css";

const NoteCard = ({ note, pageName }) => {
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

  const addToArchiveClickHandler = async () => {
    try {
      const response = await addToArchivesService(note, token);
      const {
        status,
        data: { notes, archives },
      } = response;
      if (status === 201) {
        notesDispatch({
          type: "ADD_NOTE_TO_ARCHIVES",
          payload: { notes, archives },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToTrashClickHandler = async () => {
    try {
      const response = await addToTrashService(note, token);
      const {
        status,
        data: { notes, trash },
      } = response;
      if (status === 201) {
        notesDispatch({
          type: "ADD_NOTE_TO_TRASH",
          payload: { notes, trash },
        });
      }
    } catch (error) {
      console.error(error);
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
          {pageName !== "TRASH" && (
            <>
              <button className="btn note-card-btn" onClick={editClickHandler}>
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn note-card-btn">
                <i className="bi bi-palette"></i>
              </button>
              <button className="btn note-card-btn">
                <i className="bi bi-tag"></i>
              </button>
              {pageName !== "ARCHIVES" ? (
                <button
                  className="btn note-card-btn"
                  onClick={addToArchiveClickHandler}
                >
                  <i className="bi bi-arrow-down-square"></i>
                </button>
              ) : (
                <button className="btn note-card-btn">
                  <i className="bi bi-arrow-up-square"></i>
                </button>
              )}
              <button
                className="btn note-card-btn"
                onClick={addToTrashClickHandler}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </>
          )}
          {pageName === "TRASH" && (
            <>
              <button className="btn note-card-btn">
                <i className="bi bi-back"></i>
              </button>
              <button className="btn note-card-btn">
                <i className="bi bi-trash3-fill"></i>
              </button>
            </>
          )}
        </div>
      </section>
    </article>
  );
};

export { NoteCard };
