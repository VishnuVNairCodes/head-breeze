import ReactModal from "react-modal";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { editNoteService } from "../../services/note-services";
import { addNoteService } from "../../services/note-services/addNoteService";

import "./ModalNoteInput.css";

ReactModal.setAppElement("#root");

const ModalNoteInput = () => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const {
    notesState: { modalNoteInput, modalNoteInputIsOpen, isEditing },
    notesDispatch,
  } = useNotes();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    notesDispatch({
      type: "HANDLE_NOTE_INPUT_CHANGE",
      payload: { name, value },
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = isEditing
        ? await editNoteService(modalNoteInput, token)
        : await addNoteService(modalNoteInput, token);
      const {
        status,
        data: { notes },
      } = response;
      console.log(notes, "test");
      if (status === 201) {
        notesDispatch({
          type: isEditing ? "EDIT_NOTE" : "ADD_NOTE",
          payload: notes,
        });
      }
    } catch (err) {
      console.error(err);
      // replace this with proper error handling on view
    }
  };

  return (
    <ReactModal
      className="modal-note-input"
      isOpen={modalNoteInputIsOpen}
      onRequestClose={() => {
        notesDispatch({ type: "CLOSE_MODAL_NOTE_INPUT" });
      }}
    >
      <form onSubmit={submitHandler} className="modal-note-input-form">
        <input
          type="text"
          value={modalNoteInput.title}
          name="title"
          onChange={inputChangeHandler}
          className="modal-note-input-title"
          placeholder="Title"
          autoFocus
        />
        <textarea
          rows="10"
          cols="33"
          value={modalNoteInput.content}
          name="content"
          onChange={inputChangeHandler}
          className="modal-note-input-content"
          placeholder="Take a note..."
        />
        <div className="modal-note-input-btn-container">
          <button
            type="button"
            className="btn modal-note-input-btn-secondary"
            onClick={() => notesDispatch({ type: "CLOSE_MODAL_NOTE_INPUT" })}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary modal-note-input-btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export { ModalNoteInput };
