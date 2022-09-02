import axios from "axios";

const getTrashedService = (token) =>
  axios.get("/api/trash", {
    headers: {
      authorization: token,
    },
  });

export { getTrashedService };
