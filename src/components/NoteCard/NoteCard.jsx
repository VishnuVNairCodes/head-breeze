import { useState } from "react";
import { useNoteCardHandlers } from "../../custom-hooks";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { LabelOptions } from "../LabelOptions/LabelOptions";

import "./NoteCard.css";

const NoteCard = ({ note, pageName }) => {
  const { title, content, createdAt, noteColorOption, tags } = note;

  const [showOptions, setShowOptions] = useState({
    showColorPalette: false,
    showLabelOptions: false,
  });

  const {
    editClickHandler,
    addToArchivesClickHandler,
    restoreFromArchivesClickHandler,
    archivedNoteDeleteClickHandler,
    addToTrashClickHandler,
    restoreFromTrashClickHandler,
    deleteFromTrashClickHandler,
  } = useNoteCardHandlers(note);

  return (
    <article className={`note-card note-card-color-${noteColorOption}`}>
      <section className="note-header">
        <h2 className="note-header-title">{title}</h2>
        <p className="note-header-date">{createdAt}</p>
      </section>
      <section className="note-content">
        <p>{content}</p>
      </section>
      <section className="note-labels">
        {tags.map((tag) => (
          <span key={tag.id} className="note-labels-item">
            {tag.value}
          </span>
        ))}
      </section>
      <section className="note-footer">
        <div className="note-footer-btn-container">
          {pageName === "HOME" && (
            <>
              {showOptions.showColorPalette && (
                <ColorPalette note={note} setShowOptions={setShowOptions} />
              )}
              {showOptions.showLabelOptions && (
                <LabelOptions note={note} setShowOptions={setShowOptions} />
              )}
              <button className="btn note-card-btn" onClick={editClickHandler}>
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn note-card-btn"
                onClick={() =>
                  setShowOptions((prev) => ({
                    showLabelOptions: false,
                    showColorPalette: !prev.showColorPalette,
                  }))
                }
              >
                <i className="bi bi-palette"></i>
              </button>
              {/* <button
                className="btn note-card-btn"
                onClick={() =>
                  setShowOptions((prev) => ({
                    showColorPalette: false,
                    showLabelOptions: !prev.showLabelOptions,
                  }))
                }
              >
                <i className="bi bi-tag"></i>
              </button> */}
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
              <button
                className="btn note-card-btn"
                onClick={deleteFromTrashClickHandler}
              >
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
