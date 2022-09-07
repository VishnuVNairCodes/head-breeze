import { useAuth } from "../contexts/auth-context";
import { useNotes } from "../contexts/notes-context";
import {
  addToArchivesService,
  deleteFromArchivesService,
  restoreFromArchivesService,
} from "../services/archive-services";
import { deleteNoteService } from "../services/note-services";
import {
  addToTrashService,
  deleteFromTrashService,
  restoreFromTrashService,
} from "../services/trash-services";

const useNoteCardHandlers = (note) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const { notesDispatch } = useNotes();

  const editClickHandler = () => {
    notesDispatch({ type: "OPEN_MODAL_NOTE_INPUT_TO_EDIT", payload: note });
  };

  const noteDeleteClickHandler = async () => {
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
      // replace this with proper error handling on view
    }
  };

  const restoreFromArchivesClickHandler = async () => {
    try {
      const response = await restoreFromArchivesService(note, token);
      const {
        status,
        data: { notes, archives },
      } = response;
      if (status === 200) {
        notesDispatch({
          type: "RESTORE_NOTE_FROM_ARCHIVES",
          payload: { notes, archives },
        });
      }
    } catch (error) {
      console.error(error);
      // replace this with proper error handling on view
    }
  };

  const archivedNoteDeleteClickHandler = async () => {
    try {
      const response = await deleteFromArchivesService(note, token);
      const {
        status,
        data: { archives },
      } = response;
      if (status === 200) {
        notesDispatch({ type: "DELETE_NOTE_FROM_ARCHIVES", payload: archives });
      }
    } catch (error) {
      console.error(error);
      // replace this with proper error handling on view
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
      // replace this with proper error handling on view
    }
  };

  const restoreFromTrashClickHandler = async () => {
    try {
      const response = await restoreFromTrashService(note, token);
      const {
        status,
        data: { notes, trash },
      } = response;
      if (status === 200) {
        notesDispatch({
          type: "RESTORE_FROM_TRASH",
          payload: { notes, trash },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromTrashClickHandler = async () => {
    try {
      const response = await deleteFromTrashService(note, token);
      const {
        status,
        data: { trash },
      } = response;
      if (status === 200) {
        notesDispatch({ type: "DELETE_FROM_TRASH", payload: trash });
      }
    } catch (error) {
      console.log(error);
      //replace this with proper error handling on view
    }
  };

  return {
    editClickHandler,
    noteDeleteClickHandler,
    addToArchivesClickHandler,
    restoreFromArchivesClickHandler,
    archivedNoteDeleteClickHandler,
    addToTrashClickHandler,
    restoreFromTrashClickHandler,
    deleteFromTrashClickHandler,
  };
};

export { useNoteCardHandlers };
