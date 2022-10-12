import { Express } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import expressRateLimit from "express-rate-limit";
import { logger } from "./logger";
import cors from "cors";
import hpp from "hpp";
const xss = require("xss-clean");

export const configureMiddleware = (app: Express) => {
  //body parser middleware
  app.use(express.json());

  //form parser middleware
  app.use(express.urlencoded({ extended: true }));

  //cookie parser
  app.use(cookieParser());

  //mongodb sanitize
  app.use(mongoSanitize());

  //prevent xss attacks
  app.use(xss());

  //prevent http param polution
  app.use(hpp());

  //logger middleware
  app.use(logger);

  //enable cors
  app.use(cors());

  //add rate limit to api (100 requests per 10 minutes)
  app.use(
    expressRateLimit({
      windowMs: 10 * 60 * 1000, //10 minutes
      max: 100, //limit each ip to 100 requests per windowMs
    })
  );
};
