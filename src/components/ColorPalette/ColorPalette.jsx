import { useAuth } from "../../contexts/auth-context";
import { useNotes } from "../../contexts/notes-context";
import { editNoteService } from "../../services/note-services";
import "./ColorPalette.css";

const ColorPalette = ({ note, showOptions, setShowOptions }) => {
  const {
    currentAuthInfo: { token },
  } = useAuth();
  const { notesDispatch } = useNotes();

  const colorOptions = [0, 1, 2, 3, 4, 5];

  const colorPaletteOptionClickHandler = async (colorOption) => {
    setShowOptions((showOptions) => ({
      ...showOptions,
      showColorPalette: false,
    }));
    try {
      const response = await editNoteService(
        {
          ...note,
          noteColorOption: colorOption,
        },
        token
      );
      const {
        status,
        data: { notes },
      } = response;
      console.log(notes);
      if (status === 201) {
        notesDispatch({ type: "CHANGE_NOTE_COLOR", payload: notes });
      }
    } catch (error) {
      console.error(error);
      //replace this with proper error handling on the view
    }
  };

  return (
    <menu className="color-palette">
      {colorOptions.map((colorOption) => (
        <li key={colorOption} className="color-palette-option">
          <button
            className={`btn color-palette-option-btn color-palette-option-${colorOption}`}
            onClick={() => colorPaletteOptionClickHandler(colorOption)}
          ></button>
        </li>
      ))}
    </menu>
  );
};

export { ColorPalette };
