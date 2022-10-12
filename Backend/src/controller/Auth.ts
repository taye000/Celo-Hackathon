import { validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import { User } from "../model";
import { IUser } from "../types";
import { PasswordManager } from "../utils/passwordManager";

//Get a specific user by their address
export const getCurrentUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    return res.json({ user, success: true });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("internal server error");
  }
};

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
      console.log("Please input correct phone number/password");
      res
        .status(400)
        .json({ msg: "Please input correct phone number/password" });
    }

    const payload: IUser = {
      id: user.id,
      username: user.username,
      phonenumber: user.phonenumber,
      email: user.email,
      walletAddress: user.walletAddress,
      privateKey: user.privateKey,
      password: user.password,
    };

    //sign in the user
    const token = sign({ payload }, config.JWT_SECRET, {
      expiresIn: config.JWT_TOKEN_EXPIRES_IN,
    });

    res.status(200).send({
      token,
      user: payload.id,
      msg: "User signed in successfully",
      success: true,
    });
  } catch (err: any) {
    console.error(err.message);
  }
};
