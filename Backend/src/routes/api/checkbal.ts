import { Router } from "express";
import { check } from "express-validator";
import { getBal } from "../../controller";
import { validateToken } from "../../middleware";

const router = Router();

router.post(
  "/checkbalance",
  [
    check("phonenumber", "please enter phonenumber to chcek balance").not().isEmpty(),
  ],
  validateToken,
  getBal
);

module.exports= router