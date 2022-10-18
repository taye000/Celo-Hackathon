import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { createWallet } from "./wallet";
import { User } from "../model";

//Register user
export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let _errors = errors.array().map((error) => {
      return {
        msg: error.msg,
        field: error.param,
        sucess: false,
      };
    });
    return res.status(400).json(_errors);
  }

  let { username, phonenumber, email, password } = req.body;

  const existingUser = await User.findOne({ phonenumber });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists", success: false });
  }

  //create wallet address and private key which will be saved
  let details: any = await createWallet();
  let walletAddress = details.walletAddress.toString();
  let privateKey = details.walletAddress.toString();

  console.log({ walletAddress, privateKey });

  try {
    const user = await User.create({
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      password: req.body.password,
      walletAddress: walletAddress,
      privateKey: privateKey,
    });

    let dataSaved = await user.save();

    console.log({ dataSaved });

    //sign in the user
    const token = jwt.sign(
      { phonenumber: user.phonenumber, id: user.id },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err) => {
        if (err) throw err;
        res.status(200).json({
          user,
          token,
          msg: "user registered successfully",
          success: true,
        });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res.status(404).json({ msg: err.message, success: false });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err: any) {
    console.error(err.message);
    res.status(404).json({ msg: err.message, success: false });
  }
};

export const getUserById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (err: any) {
    console.log(err.msg);
    return null;
  }
};
