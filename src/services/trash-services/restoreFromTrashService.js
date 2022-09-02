import axios from "axios";

const restoreFromTrashService = (note, token) =>
  axios.post(
    `api/trash/restore/${note._id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export { restoreFromTrashService };
