import axios from "axios";

const getArchivesService = (token) =>
  axios.get("/api/archives", {
    headers: {
      authorization: token,
    },
  });

export { getArchivesService };
