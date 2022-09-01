import axios from "axios";

const deleteNoteService = (note, token) =>
  axios.delete(`api/notes/${note._id}`, {
    headers: {
      authorization: token,
    },
  });

export { deleteNoteService };
