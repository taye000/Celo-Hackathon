import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../model";
import { IUser } from "../types";
import { PasswordManager } from "../utils/passwordManager";

//Authenticate user and get session token
export const login = async (req: any, res: any) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phonenumber, password } = req.body;

  try {
    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    //check the password
    const passwordMatch = await PasswordManager.compare(
      user.password!,
      password
    );

    if (!passwordMatch) {
      console.log("Incorrect password");
      res.status(400).json({ msg: "Incorrect password" });
    }

    //sign in the user
    const token = jwt.sign(
      { phonenumber: user.email, id: user.id },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      }
    );

    res.status(200).send({
      user,
      token,
      msg: "User signed in successfully",
      success: true,
    });
  } catch (err: any) {
    console.error("error signing in", err);
    res.status(500).json({ msg: "error signing in", success: false });
  }
};
