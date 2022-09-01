import { createContext, useContext, useEffect, useReducer } from "react";
import { getNotesService } from "../services/note-services/getNotesService";
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
          notes: [...notesAction.payload],
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
    try {
      const response = await getNotesService(token);
      const {
        status,
        data: { notes },
      } = response;
      if (status === 200) {
        notesDispatch({ type: "INIT_NOTES", payload: notes });
      }
    } catch (error) {
      console.log(error);
      // replace this with proper error handling message on view
    }
  };

  useEffect(() => {
    if (token) {
      notesDispatch({ type: "SET_LOADER_TRUE" });
      getNotes(token);
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
