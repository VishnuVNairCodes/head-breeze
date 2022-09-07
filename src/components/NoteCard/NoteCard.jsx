import { useNoteCardHandlers } from "../../custom-hooks";
import "./NoteCard.css";

const NoteCard = ({ note, pageName }) => {
  const { title, content } = note;

  const {
    editClickHandler,
    noteDeleteClickHandler,
    addToArchivesClickHandler,
    restoreFromArchivesClickHandler,
    archivedNoteDeleteClickHandler,
    addToTrashClickHandler,
    restoreFromTrashClickHandler,
  } = useNoteCardHandlers(note);

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
          {pageName === "HOME" && (
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
              <button
                className="btn note-card-btn"
                onClick={addToArchivesClickHandler}
              >
                <i className="bi bi-arrow-down-square"></i>
              </button>
              <button
                className="btn note-card-btn"
                onClick={addToTrashClickHandler}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </>
          )}
          {pageName === "ARCHIVES" && (
            <>
              <button
                className="btn note-card-btn"
                onClick={restoreFromArchivesClickHandler}
              >
                <i className="bi bi-arrow-up-square"></i>
              </button>
              <button
                className="btn note-card-btn"
                onClick={archivedNoteDeleteClickHandler}
              >
                <i className="bi bi-file-x"></i>
              </button>
            </>
          )}
          {pageName === "TRASH" && (
            <>
              <button
                className="btn note-card-btn"
                onClick={restoreFromTrashClickHandler}
              >
                <i className="bi bi-back"></i>
              </button>
              <button className="btn note-card-btn">
                <i className="bi bi-file-x"></i>
              </button>
            </>
          )}
        </div>
      </section>
    </article>
  );
};

export { NoteCard };
