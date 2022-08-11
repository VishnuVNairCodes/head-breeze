import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
    lastName: "Balika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
