// import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { editNoteService } from "../../services/note-services";

const LabelOption = ({ note, label }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();
  const { notesDispatch } = useNotes();

  // const isLabelPresentInNote = () =>
  //   note.tags.find((tag) => tag.id === label.id) ? true : false;

  // const [isLabelInNote, setIsLabelInNote] = useState(isLabelPresentInNote());

  const toggleCheckboxHandler = async (label) => {
    const getNewNote = () => {
      if (note.tags.find((tag) => tag.id === label.id)) {
        return {
          ...note,
          tags: note.tags.filter((tag) => tag.id !== label.id),
        };
      }
      return { ...note, tags: [...note.tags, label] };
    };
    const newNote = getNewNote();
    try {
      const response = await editNoteService(newNote, token);
      const {
        status,
        data: { notes },
      } = response;
      if (status === 201) {
        notesDispatch({
          type: "TOGGLE_SELECT_LABEL",
          payload: { notes },
        });
      }
    } catch (error) {
      console.error(error);
      // replace this with proper error handling on the view
    }
  };

  // useEffect(() => {
  //   setIsLabelInNote(note.tags.fin((tag) => tag.id === label.id));
  // }, [label.id, note.tags]);

  return (
    <label
      htmlFor="label-options-checkbox"
      className="label-options-checkbox-container"
    >
      <input
        id="label-options-checkbox"
        className="label-options-checkbox"
        type="checkbox"
        checked={note.tags.find((tag) => tag.id === label.id)}
        onChange={() => toggleCheckboxHandler(label)}
      />
      {label.value}
    </label>
  );
};

export { LabelOption };
