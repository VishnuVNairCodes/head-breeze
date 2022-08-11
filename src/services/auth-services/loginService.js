import axios from "axios";

const loginService = async (email, password) =>
  await axios.post("/api/auth/login", { email, password });

export { loginService };
