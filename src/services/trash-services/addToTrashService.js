import axios from "axios";

const addToTrashService = (note, token) =>
  axios.post(
    `/api/notes/trash/${note._id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export { addToTrashService };
