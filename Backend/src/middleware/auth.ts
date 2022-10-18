import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (req.headers.Authorization as string)?.split(" ")[1];

    let decodedData: any;
    if (token) {
      decodedData = jwt.verify(token, config.JWT_SECRET);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err: any) {
    console.error(
      "Internal authentication error - error in token validation middleware"
    );
    res.status(500).json({ msg: "Internal authentication error" });
  }
};
