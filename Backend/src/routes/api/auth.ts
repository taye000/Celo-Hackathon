import { Router } from "express";
import { check } from "express-validator";
import { login } from "../../controller";

const router = Router();

router.get("/");

router.post(
  "/login",
  [
    check("phonenumber", "please provide phone number")
      .not()
      .trim()
      .isEmpty()
      .isLength({ min: 10, max: 13 }),
  ],
  [
    check("password", "please provide password")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 4, max: 20 }),
  ],
  login
);

module.exports = router;
