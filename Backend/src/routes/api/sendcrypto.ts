import { Router } from "express";
import { check } from "express-validator";
import { swapCrypto } from "../../controller";

const router = Router();

router.post(
  "/sendcrypto",
  [
    check("phonenumber", "phone number or address of recipient required").not().isEmpty(),
    check("amount", "please enter amount to send").not().isEmpty(),
  ],
  swapCrypto
);

module.exports= router