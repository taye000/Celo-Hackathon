import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import { createWallet } from "./wallet";
import { User } from "../model";

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

  let { phonenumber } = req.body;

  if (await User.exists({ phonenumber })) {
    return res.status(400).json({ msg: "User already exists", success: false });
  }

  //create wallet address and private key which will be saved
  let details = await createWallet();
  let walletAddress = details.walletAddress.toString();
  let privateKey = details.walletAddress.toString();

  console.log({ walletAddress, privateKey });

  console.log(req.body);

  try {
    const user = new User({
      username: req.body.username,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      password: req.body.password,
      walletAddress: walletAddress,
      privateKey: privateKey,
    });

    let dataSaved = await user.save();

    console.log({ dataSaved });

    const payload = {
      user: {
        id: user.id,
      },
    };
    sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_EXPIRES_IN,
      },
      (err) => {
        if (err) throw err;
        res.status(200).json({ dataSaved, msg:"user registered successfully" , success: true });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
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
