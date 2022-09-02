import axios from "axios";

const addToTrashService = (note, token) =>
  axios.post(
    `/notes/trash/${note._id}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export { addToTrashService };
