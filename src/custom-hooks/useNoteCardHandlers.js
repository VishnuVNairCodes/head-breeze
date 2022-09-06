import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { addToArchivesService } from "../../services/archive-services/addToArchivesService";
import { deleteNoteService } from "../../services/note-services";
import { addToTrashService } from "../../services/trash-services/addToTrashService";

const useNoteCardHandlers = (note) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const { notesDispatch } = useNotes();

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

  const addToArchivesClickHandler = async () => {
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

  return {
    editClickHandler,
    deleteClickHandler,
    addToArchivesClickHandler,
    addToTrashClickHandler,
  };
};

export { useNoteCardHandlers };