import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    let decodedData: any;
    if (token) {
      decodedData = jwt.verify(token, config.JWT_SECRET);
      req.user.id = decodedData?.id;
    }
    next();
  } catch (err: any) {
    console.error(
      "Internal authentication error - error in token validation middleware"
    );
    res.status(500).json({ msg: "Internal authentication error" });
  }
};

// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   } else {
//     try {
//       const payload = jwt.verify(req.session.jwt, config.JWT_SECRET);
//       req.session.currentUser = payload;
//     } catch (err) {
//       console.error("Internal authentication error");
//       res.status(500).json({ msg: "Internal authentication error" });
//     }
//     next();
//   }
// };
