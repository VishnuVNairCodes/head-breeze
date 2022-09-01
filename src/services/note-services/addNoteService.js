import axios from "axios";

const addNoteService = (note, token) =>
  axios.post(
    "/api/notes",
    {
      note,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export { addNoteService };
