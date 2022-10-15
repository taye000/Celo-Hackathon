import express from "express";

declare global {
  namespace Express {
  interface Request {
    user: any;
    userId: any;
  }
  interface Response {
    user: any;
    userId: any;
  }}
}
