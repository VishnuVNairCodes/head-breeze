import axios from "axios";

const restoreFromArchivesService = (note, token) =>
  axios.post(`/api/archives/restore/${note._id}`, {
    headers: {
      authorization: token,
    },
  });

export { restoreFromArchivesService };
