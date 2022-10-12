import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized Request!", success: false });
  }
  try {
    verify(token, config.JWT_SECRET, (err, decoded: any) => {
      if (err || !decoded) {
        console.log(err);
        return res
          .status(401)
          .json({ msg: "Unauthorized Request!", success: false });
      } else {
        req.user = decoded?.user || decoded;
        next();
      }
    });
  } catch (err: any) {
    console.error(
      "Internal authentication error - error in token validation middleware"
    );
    res.status(500).json({ msg: "Internal authentication error" });
  }
};
