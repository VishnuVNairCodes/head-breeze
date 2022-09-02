import axios from "axios";

const addToArchivesNoteService = (note, token) =>
  axios.post(
    `/api/notes/archives/${note._id}`,
    {
      note,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export { addToArchivesNoteService };
