import axios from "axios";

const deleteFromArchivesService = (note, token) =>
  axios.delete(`/api/archives/delete/${note._id}`, {
    headers: {
      authorization: token,
    },
  });

export { deleteFromArchivesService };
