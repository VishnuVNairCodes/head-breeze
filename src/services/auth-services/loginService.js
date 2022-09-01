import axios from "axios";

const loginService = (email, password) =>
  axios.post("/api/auth/login", { email, password });

export { loginService };
