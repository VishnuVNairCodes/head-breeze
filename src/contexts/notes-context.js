// import { v4 as uuidv4 } from "uuid";
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

  const modalNoteInputInitialState = {
    title: "",
    content: "",
    noteColorOption: 0,
  };

  const notesReducer = (notesState, notesAction) => {
    switch (notesAction.type) {
      case "INIT_NOTES":
        return {
          ...notesState,
          notes: notesAction.payload.notes,
          notesArchived: notesAction.payload.archives,
          notesTrashed: notesAction.payload.trashed,
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
          notes: notesAction.payload,
          modalNoteInput: modalNoteInputInitialState,
          modalNoteInputIsOpen: false,
        };
      case "EDIT_NOTE":
        return {
          ...notesState,
          notes: notesAction.payload,
          modalNoteInput: modalNoteInputInitialState,
          modalNoteInputIsOpen: false,
          isEditing: false,
        };
      case "INPUT_NOTE_COLOR":
        return {
          ...notesState,
          modalNoteInput: {
            ...notesState.modalNoteInput,
            noteColorOption: notesAction.payload,
          },
        };
      case "DELETE_NOTE":
        return {
          ...notesState,
          notes: notesAction.payload,
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
          modalNoteInput: notesAction.payload,
          isEditing: true,
        };
      case "CLOSE_MODAL_NOTE_INPUT":
        return {
          ...notesState,
          modalNoteInput: modalNoteInputInitialState,
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
          notes: notesAction.payload.notes,
          notesArchived: notesAction.payload.archives,
        };
      case "RESTORE_NOTE_FROM_ARCHIVES":
        return {
          ...notesState,
          notes: notesAction.payload.notes,
          notesArchived: notesAction.payload.archives,
        };
      case "DELETE_NOTE_FROM_ARCHIVES":
        return {
          ...notesState,
          notesArchived: notesAction.payload,
        };
      case "ADD_NOTE_TO_TRASH":
        return {
          ...notesState,
          notes: notesAction.payload.notes,
          notesTrashed: notesAction.payload.trash,
        };
      case "RESTORE_FROM_TRASH":
        return {
          ...notesState,
          notes: notesAction.payload.notes,
          notesTrashed: notesAction.payload.trash,
        };
      case "DELETE_FROM_TRASH":
        return {
          ...notesState,
          notesTrashed: notesAction.payload,
        };
      case "CHANGE_NOTE_COLOR":
        return {
          ...notesState,
          notes: notesAction.payload,
        };

      case "ADD_&_SELECT_LABEL":
        return {
          ...notesState,
          labels: [...notesState.labels, notesAction.payload.label],
          notes: notesAction.payload.notes,
        };

      case "TOGGLE_SELECT_LABEL":
        // const getNewLabels = (oldLabels, label) => {
        //   const updatedLabels = [...oldLabels];
        //   const indexOfLabelToBeUpdated = updatedLabels.findIndex(
        //     (item) => item.id === label.id
        //   );
        //   updatedLabels[indexOfLabelToBeUpdated] = label;
        //   return updatedLabels;
        // };
        // const newLabels = getNewLabels(
        //   notesState.labels,
        //   notesAction.payload.label
        // );
        return {
          ...notesState,
          notes: notesAction.payload.notes,
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
    modalNoteInput: modalNoteInputInitialState,
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
    <NotesContext.Provider
      value={{
        notesState,
        notesDispatch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
