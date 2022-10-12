import { Application } from "express";

export const configureRoutes = (app: Application) => {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/users", require("./api/users"));
  app.use("/api/sendcrypto", require("./api/sendcrypto"));
  app.use("/api/checkbal", require("./api/checkbal"));
  app.use("/api/mpesa", require("./api/mpesa"));
  app.use("/", (_req, res) => {
    res.status(200).send("Welcome to Swap Crypto");
  });
};
