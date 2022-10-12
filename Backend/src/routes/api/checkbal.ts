import { Router } from "express";
import { check } from "express-validator";
import { getBal } from "../../controller";

const router = Router();

router.post(
  "/checkbalance",
  [
    check("phonenumber", "please enter phonenumber to chcek balance").not().isEmpty(),
  ],
  getBal
);

module.exports= router