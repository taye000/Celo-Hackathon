import axios from "axios";

export const config = {
  axios: axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3006/api"
        : '"http://localhost:3006/api',
  }),
};
