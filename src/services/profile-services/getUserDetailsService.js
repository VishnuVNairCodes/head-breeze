import axios from "axios";

const getUserDetailsService = (token) =>
  axios.get("/api/user", {
    headers: {
      authorization: token,
    },
  });

export { getUserDetailsService };
