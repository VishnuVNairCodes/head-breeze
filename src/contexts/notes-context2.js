import { createContext, useContext, useEffect, useState } from "react";
import { getNotesService } from "../services/note-services/getNotesService";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();

  const [notesAll, setNotesAll] = useState([]);

  const getNotesAll = async (token) => {
    try {
      const response = await getNotesService(token);
      const {
        status,
        data: { notes },
      } = response;
      if (status === 200) {
        setNotesAll([...notes]);
      }
    } catch (error) {
      console.log(error);
      // replace this with proper error handling message on view
    }
  };

  useEffect(() => {
    if (token) {
      getNotesAll(token);
    }
  }, [token]);

  return (
    <NotesContext.Provider value={{ notesAll, setNotesAll }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes };
