import "./NoteCard.css";

const NoteCard = () => {
  return (
    <article className="note-card">
      <section className="note-header">
        <h2 className="note-header-title">Title of note</h2>
        <button className="btn note-card-btn">
          <i className="bi bi-pin-fill"></i>
        </button>
      </section>
      <section className="note-content">
        <p>Body of the note</p>
      </section>
      <section className="note-labels">
        <span className="note-labels-item">Label 1</span>
        <span className="note-labels-item">Label 2</span>
        <span className="note-labels-item">Label 3</span>
      </section>
      <section className="note-footer">
        <p className="note-footer-date">Created on 26/10/2021</p>
        <div className="note-footer-btn-container">
          <button className="btn note-card-btn">
            <i className="bi bi-palette"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-tag"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-save"></i>
          </button>
          <button className="btn note-card-btn">
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </section>
    </article>
  );
};

export { NoteCard };
