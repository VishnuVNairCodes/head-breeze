import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { editNoteService } from "../../services/note-services";

const LabelOption = ({ note, label }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();
  const { notesDispatch } = useNotes();

  const isLabelPresentInNote = note.tags.find((tag) => tag.id === label.id)
    ? true
    : false;

  const [labelOptionProps, setLabelOptionProps] = useState({
    isOngoingCall: false,
    isLabelChecked: isLabelPresentInNote,
  });
  const { isOngoingCall, isLabelChecked } = labelOptionProps;

  const toggleCheckboxHandler = async (label) => {
    setLabelOptionProps((prev) => ({ ...prev, isOngoingCall: true }));
    const getNewNote = () => {
      if (isLabelPresentInNote) {
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
        setLabelOptionProps((prev) => ({
          ...prev,
          isOngoingCall: false,
          isLabelChecked: !prev.isLabelChecked,
        }));
      }
    } catch (error) {
      console.error(error);
      // replace this with proper error handling on the view
    }
  };

  return (
    <label
      htmlFor="label-options-checkbox"
      className="label-options-checkbox-container"
    >
      <input
        id="label-options-checkbox"
        className="label-options-checkbox"
        type="checkbox"
        checked={isLabelChecked}
        disabled={isOngoingCall}
        onChange={() => toggleCheckboxHandler(label)}
      />
      {label.value}
    </label>
  );
};

export { LabelOption };
