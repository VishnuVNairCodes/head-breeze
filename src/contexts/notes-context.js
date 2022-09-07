import { createContext, useContext, useEffect, useReducer } from "react";
import { getArchivesService } from "../services/archive-services/getArchivesService";
import { getNotesService } from "../services/note-services/getNotesService";
import { getTrashedService } from "../services/trash-services/getTrashedService";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const notesReducer = (notesState, notesAction) => {
    switch (notesAction.type) {
      case "INIT_NOTES":
        return {
          ...notesState,
          notes: [...notesAction.payload.notes],
          notesArchived: [...notesAction.payload.archives],
          notesTrashed: [...notesAction.payload.trashed],
          loader: false,
        };
      case "SET_LOADER_TRUE":
        return {
          ...notesState,
          loader: true,
        };
      case "ADD_NOTE":
        return {
          ...notesState,
          notes: [...notesAction.payload],
          modalNoteInput: { title: "", content: "" },
          modalNoteInputIsOpen: false,
        };
      case "EDIT_NOTE":
        return {
          ...notesState,
          notes: [...notesAction.payload],
          modalNoteInput: { title: "", content: "" },
          modalNoteInputIsOpen: false,
          isEditing: false,
        };
      case "DELETE_NOTE":
        return {
          ...notesState,
          notes: [...notesAction.payload],
        };
      case "OPEN_MODAL_NOTE_INPUT":
        return {
          ...notesState,
          modalNoteInputIsOpen: true,
        };
      case "OPEN_MODAL_NOTE_INPUT_TO_EDIT":
        return {
          ...notesState,
          modalNoteInputIsOpen: true,
          modalNoteInput: { ...notesAction.payload },
          isEditing: true,
        };
      case "CLOSE_MODAL_NOTE_INPUT":
        return {
          ...notesState,
          modalNoteInput: { title: "", content: "" },
          modalNoteInputIsOpen: false,
        };
      case "HANDLE_NOTE_INPUT_CHANGE":
        return {
          ...notesState,
          modalNoteInput: {
            ...notesState.modalNoteInput,
            [notesAction.payload.name]: notesAction.payload.value,
          },
        };
      case "ADD_NOTE_TO_ARCHIVES":
        return {
          ...notesState,
          notes: [...notesAction.payload.notes],
          notesArchived: [...notesAction.payload.archives],
        };
      case "RESTORE_NOTE_FROM_ARCHIVES":
        return {
          ...notesState,
          notes: [...notesAction.payload.notes],
          notesArchived: [...notesAction.payload.archives],
        };
      case "ADD_NOTE_TO_TRASH":
        return {
          ...notesState,
          notes: [...notesAction.payload.notes],
          notesTrashed: [...notesAction.payload.trash],
        };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [notesState, notesDispatch] = useReducer(notesReducer, {
    notes: [],
    notesArchived: [],
    notesTrashed: [],
    labels: [],
    loader: false,
    modalNoteInput: { title: "", content: "" },
    modalNoteInputIsOpen: false,
    isEditing: false,
  });

  const getNotes = async (token) => {
    const response = await getNotesService(token);
    const {
      status,
      data: { notes },
    } = response;
    if (status === 200) {
      return notes;
    }
    return [];
  };

  const getArchives = async (token) => {
    const response = await getArchivesService(token);
    const {
      status,
      data: { archives },
    } = response;
    if (status === 200) {
      return archives;
    }
    return [];
  };

  const getTrashed = async (token) => {
    const response = await getTrashedService(token);
    const {
      status,
      data: { trash },
    } = response;
    if (status === 200) {
      return trash;
    }
    return [];
  };

  useEffect(() => {
    if (token) {
      notesDispatch({ type: "SET_LOADER_TRUE" });
      (async (token) => {
        try {
          const notes = await getNotes(token);
          const archives = await getArchives(token);
          const trashed = await getTrashed(token);
          notesDispatch({
            type: "INIT_NOTES",
            payload: {
              notes,
              archives,
              trashed,
            },
          });
        } catch (error) {
          console.log(error);
          // replace this with proper error handling message on view
        }
      })(token);
    }
  }, [token]);

  return (
    <NotesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
