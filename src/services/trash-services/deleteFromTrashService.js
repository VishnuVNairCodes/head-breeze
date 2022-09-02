import axios from "axios";

const deleteFromTrashService = (note, token) =>
  axios.delete(`/api/trash/delete/${note._id}`, {
    headers: {
      authorization: token,
    },
  });

export { deleteFromTrashService };
