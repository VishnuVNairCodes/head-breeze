import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { editNoteService } from "../../services/note-services";
import "./LabelOptions.css";
import { LabelOption } from "../LabelOption/LabelOption";

const LabelOptions = ({ note }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();
  const {
    notesState: { labels },
    notesDispatch,
  } = useNotes();

  const [labelOptionsInput, setLabelOptionsInput] = useState("");

  const labelOptionsInputChangeHandler = (e) =>
    setLabelOptionsInput(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const label = { id: uuidv4(), value: labelOptionsInput };
      const response = await editNoteService(
        {
          ...note,
          tags: [...note.tags, label],
        },
        token
      );
      setLabelOptionsInput("");
      const {
        status,
        data: { notes },
      } = response;
      if (status === 201) {
        notesDispatch({
          type: "ADD_&_SELECT_LABEL",
          payload: { notes, label },
        });
      }
    } catch (error) {
      console.error(error);
      // replace with proper error handling on the view
    }
  };

  return (
    <div className="label-options-container">
      <form onSubmit={submitHandler} className="label-options-form">
        <h1 className="label-options-heading">Label Options:</h1>
        <ul className="label-options-list">
          {labels.map((label) => (
            <li key={label.id}>
              <LabelOption note={note} label={label} />
            </li>
          ))}
        </ul>
        <div className="label-options-input-container">
          <input
            type="text"
            className="label-options-input"
            name="label-options-input"
            value={labelOptionsInput}
            onChange={labelOptionsInputChangeHandler}
          />
          <button
            type="submit"
            className="btn btn-primary-outline label-options-btn"
            disabled={labelOptionsInput === "" ? true : false}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export { LabelOptions };
