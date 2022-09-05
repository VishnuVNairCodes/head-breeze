import axios from "axios";

const addToArchivesService = (note, token) =>
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

export { addToArchivesService };
