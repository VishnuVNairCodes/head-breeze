import axios from "axios";

const signupService = (email, password, firstName, lastName) =>
  axios.post("/api/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });

export { signupService };
